package dmn.sn.web.rest;

import com.codahale.metrics.annotation.Timed;
import dmn.sn.domain.Presence;
import dmn.sn.repository.PresenceRepository;
import dmn.sn.web.rest.errors.BadRequestAlertException;
import dmn.sn.web.rest.util.HeaderUtil;
import dmn.sn.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Presence.
 */
@RestController
@RequestMapping("/api")
public class PresenceResource {

    private final Logger log = LoggerFactory.getLogger(PresenceResource.class);

    private static final String ENTITY_NAME = "presence";

    private final PresenceRepository presenceRepository;

    public PresenceResource(PresenceRepository presenceRepository) {
        this.presenceRepository = presenceRepository;
    }

    /**
     * POST  /presences : Create a new presence.
     *
     * @param presence the presence to create
     * @return the ResponseEntity with status 201 (Created) and with body the new presence, or with status 400 (Bad Request) if the presence has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/presences")
    @Timed
    public ResponseEntity<Presence> createPresence(@RequestBody Presence presence) throws URISyntaxException {
        log.debug("REST request to save Presence : {}", presence);
        if (presence.getId() != null) {
            throw new BadRequestAlertException("A new presence cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Presence result = presenceRepository.save(presence);
        return ResponseEntity.created(new URI("/api/presences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /presences : Updates an existing presence.
     *
     * @param presence the presence to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated presence,
     * or with status 400 (Bad Request) if the presence is not valid,
     * or with status 500 (Internal Server Error) if the presence couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/presences")
    @Timed
    public ResponseEntity<Presence> updatePresence(@RequestBody Presence presence) throws URISyntaxException {
        log.debug("REST request to update Presence : {}", presence);
        if (presence.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Presence result = presenceRepository.save(presence);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, presence.getId().toString()))
            .body(result);
    }

    /**
     * GET  /presences : get all the presences.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of presences in body
     */
    @GetMapping("/presences")
    @Timed
    public ResponseEntity<List<Presence>> getAllPresences(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("evenement-is-null".equals(filter)) {
            log.debug("REST request to get all Presences where evenement is null");
            return new ResponseEntity<>(StreamSupport
                .stream(presenceRepository.findAll().spliterator(), false)
                .filter(presence -> presence.getEvenement() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of Presences");
        Page<Presence> page = presenceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/presences");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /presences/:id : get the "id" presence.
     *
     * @param id the id of the presence to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the presence, or with status 404 (Not Found)
     */
    @GetMapping("/presences/{id}")
    @Timed
    public ResponseEntity<Presence> getPresence(@PathVariable Long id) {
        log.debug("REST request to get Presence : {}", id);
        Optional<Presence> presence = presenceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(presence);
    }

    /**
     * DELETE  /presences/:id : delete the "id" presence.
     *
     * @param id the id of the presence to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/presences/{id}")
    @Timed
    public ResponseEntity<Void> deletePresence(@PathVariable Long id) {
        log.debug("REST request to delete Presence : {}", id);

        presenceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
