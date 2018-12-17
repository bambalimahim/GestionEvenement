package dmn.sn.web.rest;

import dmn.sn.GestionEvenementApp;

import dmn.sn.domain.Presence;
import dmn.sn.repository.PresenceRepository;
import dmn.sn.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static dmn.sn.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PresenceResource REST controller.
 *
 * @see PresenceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEvenementApp.class)
public class PresenceResourceIntTest {

    @Autowired
    private PresenceRepository presenceRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPresenceMockMvc;

    private Presence presence;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PresenceResource presenceResource = new PresenceResource(presenceRepository);
        this.restPresenceMockMvc = MockMvcBuilders.standaloneSetup(presenceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Presence createEntity(EntityManager em) {
        Presence presence = new Presence();
        return presence;
    }

    @Before
    public void initTest() {
        presence = createEntity(em);
    }

    @Test
    @Transactional
    public void createPresence() throws Exception {
        int databaseSizeBeforeCreate = presenceRepository.findAll().size();

        // Create the Presence
        restPresenceMockMvc.perform(post("/api/presences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presence)))
            .andExpect(status().isCreated());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeCreate + 1);
        Presence testPresence = presenceList.get(presenceList.size() - 1);
    }

    @Test
    @Transactional
    public void createPresenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = presenceRepository.findAll().size();

        // Create the Presence with an existing ID
        presence.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPresenceMockMvc.perform(post("/api/presences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presence)))
            .andExpect(status().isBadRequest());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPresences() throws Exception {
        // Initialize the database
        presenceRepository.saveAndFlush(presence);

        // Get all the presenceList
        restPresenceMockMvc.perform(get("/api/presences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(presence.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getPresence() throws Exception {
        // Initialize the database
        presenceRepository.saveAndFlush(presence);

        // Get the presence
        restPresenceMockMvc.perform(get("/api/presences/{id}", presence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(presence.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPresence() throws Exception {
        // Get the presence
        restPresenceMockMvc.perform(get("/api/presences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePresence() throws Exception {
        // Initialize the database
        presenceRepository.saveAndFlush(presence);

        int databaseSizeBeforeUpdate = presenceRepository.findAll().size();

        // Update the presence
        Presence updatedPresence = presenceRepository.findById(presence.getId()).get();
        // Disconnect from session so that the updates on updatedPresence are not directly saved in db
        em.detach(updatedPresence);

        restPresenceMockMvc.perform(put("/api/presences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPresence)))
            .andExpect(status().isOk());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeUpdate);
        Presence testPresence = presenceList.get(presenceList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPresence() throws Exception {
        int databaseSizeBeforeUpdate = presenceRepository.findAll().size();

        // Create the Presence

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPresenceMockMvc.perform(put("/api/presences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presence)))
            .andExpect(status().isBadRequest());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePresence() throws Exception {
        // Initialize the database
        presenceRepository.saveAndFlush(presence);

        int databaseSizeBeforeDelete = presenceRepository.findAll().size();

        // Get the presence
        restPresenceMockMvc.perform(delete("/api/presences/{id}", presence.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Presence.class);
        Presence presence1 = new Presence();
        presence1.setId(1L);
        Presence presence2 = new Presence();
        presence2.setId(presence1.getId());
        assertThat(presence1).isEqualTo(presence2);
        presence2.setId(2L);
        assertThat(presence1).isNotEqualTo(presence2);
        presence1.setId(null);
        assertThat(presence1).isNotEqualTo(presence2);
    }
}
