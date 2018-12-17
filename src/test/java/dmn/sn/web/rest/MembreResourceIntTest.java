package dmn.sn.web.rest;

import dmn.sn.GestionEvenementApp;

import dmn.sn.domain.Membre;
import dmn.sn.repository.MembreRepository;
import dmn.sn.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static dmn.sn.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MembreResource REST controller.
 *
 * @see MembreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEvenementApp.class)
public class MembreResourceIntTest {

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    @Autowired
    private MembreRepository membreRepository;

    @Mock
    private MembreRepository membreRepositoryMock;

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

    private MockMvc restMembreMockMvc;

    private Membre membre;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MembreResource membreResource = new MembreResource(membreRepository);
        this.restMembreMockMvc = MockMvcBuilders.standaloneSetup(membreResource)
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
    public static Membre createEntity(EntityManager em) {
        Membre membre = new Membre()
            .telephone(DEFAULT_TELEPHONE);
        return membre;
    }

    @Before
    public void initTest() {
        membre = createEntity(em);
    }

    @Test
    @Transactional
    public void createMembre() throws Exception {
        int databaseSizeBeforeCreate = membreRepository.findAll().size();

        // Create the Membre
        restMembreMockMvc.perform(post("/api/membres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membre)))
            .andExpect(status().isCreated());

        // Validate the Membre in the database
        List<Membre> membreList = membreRepository.findAll();
        assertThat(membreList).hasSize(databaseSizeBeforeCreate + 1);
        Membre testMembre = membreList.get(membreList.size() - 1);
        assertThat(testMembre.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
    }

    @Test
    @Transactional
    public void createMembreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = membreRepository.findAll().size();

        // Create the Membre with an existing ID
        membre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMembreMockMvc.perform(post("/api/membres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membre)))
            .andExpect(status().isBadRequest());

        // Validate the Membre in the database
        List<Membre> membreList = membreRepository.findAll();
        assertThat(membreList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = membreRepository.findAll().size();
        // set the field null
        membre.setTelephone(null);

        // Create the Membre, which fails.

        restMembreMockMvc.perform(post("/api/membres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membre)))
            .andExpect(status().isBadRequest());

        List<Membre> membreList = membreRepository.findAll();
        assertThat(membreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMembres() throws Exception {
        // Initialize the database
        membreRepository.saveAndFlush(membre);

        // Get all the membreList
        restMembreMockMvc.perform(get("/api/membres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(membre.getId().intValue())))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllMembresWithEagerRelationshipsIsEnabled() throws Exception {
        MembreResource membreResource = new MembreResource(membreRepositoryMock);
        when(membreRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restMembreMockMvc = MockMvcBuilders.standaloneSetup(membreResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restMembreMockMvc.perform(get("/api/membres?eagerload=true"))
        .andExpect(status().isOk());

        verify(membreRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllMembresWithEagerRelationshipsIsNotEnabled() throws Exception {
        MembreResource membreResource = new MembreResource(membreRepositoryMock);
            when(membreRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restMembreMockMvc = MockMvcBuilders.standaloneSetup(membreResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restMembreMockMvc.perform(get("/api/membres?eagerload=true"))
        .andExpect(status().isOk());

            verify(membreRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getMembre() throws Exception {
        // Initialize the database
        membreRepository.saveAndFlush(membre);

        // Get the membre
        restMembreMockMvc.perform(get("/api/membres/{id}", membre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(membre.getId().intValue()))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMembre() throws Exception {
        // Get the membre
        restMembreMockMvc.perform(get("/api/membres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMembre() throws Exception {
        // Initialize the database
        membreRepository.saveAndFlush(membre);

        int databaseSizeBeforeUpdate = membreRepository.findAll().size();

        // Update the membre
        Membre updatedMembre = membreRepository.findById(membre.getId()).get();
        // Disconnect from session so that the updates on updatedMembre are not directly saved in db
        em.detach(updatedMembre);
        updatedMembre
            .telephone(UPDATED_TELEPHONE);

        restMembreMockMvc.perform(put("/api/membres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMembre)))
            .andExpect(status().isOk());

        // Validate the Membre in the database
        List<Membre> membreList = membreRepository.findAll();
        assertThat(membreList).hasSize(databaseSizeBeforeUpdate);
        Membre testMembre = membreList.get(membreList.size() - 1);
        assertThat(testMembre.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
    }

    @Test
    @Transactional
    public void updateNonExistingMembre() throws Exception {
        int databaseSizeBeforeUpdate = membreRepository.findAll().size();

        // Create the Membre

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMembreMockMvc.perform(put("/api/membres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membre)))
            .andExpect(status().isBadRequest());

        // Validate the Membre in the database
        List<Membre> membreList = membreRepository.findAll();
        assertThat(membreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMembre() throws Exception {
        // Initialize the database
        membreRepository.saveAndFlush(membre);

        int databaseSizeBeforeDelete = membreRepository.findAll().size();

        // Get the membre
        restMembreMockMvc.perform(delete("/api/membres/{id}", membre.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Membre> membreList = membreRepository.findAll();
        assertThat(membreList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Membre.class);
        Membre membre1 = new Membre();
        membre1.setId(1L);
        Membre membre2 = new Membre();
        membre2.setId(membre1.getId());
        assertThat(membre1).isEqualTo(membre2);
        membre2.setId(2L);
        assertThat(membre1).isNotEqualTo(membre2);
        membre1.setId(null);
        assertThat(membre1).isNotEqualTo(membre2);
    }
}
