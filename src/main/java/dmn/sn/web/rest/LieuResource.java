package dmn.sn.web.rest;

import com.codahale.metrics.annotation.Timed;
import dmn.sn.domain.Lieu;
import dmn.sn.repository.LieuRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Lieu.
 */
@RestController
@RequestMapping("/api")
public class LieuResource {

    private final Logger log = LoggerFactory.getLogger(LieuResource.class);

    private static final String ENTITY_NAME = "lieu";

    private final LieuRepository lieuRepository;

    public LieuResource(LieuRepository lieuRepository) {
        this.lieuRepository = lieuRepository;
    }

    /**
     * POST  /lieus : Create a new lieu.
     *
     * @param lieu the lieu to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lieu, or with status 400 (Bad Request) if the lieu has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lieus")
    @Timed
    public ResponseEntity<Lieu> createLieu(@Valid @RequestBody Lieu lieu) throws URISyntaxException {
        log.debug("REST request to save Lieu : {}", lieu);
        if (lieu.getId() != null) {
            throw new BadRequestAlertException("A new lieu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lieu result = lieuRepository.save(lieu);
        return ResponseEntity.created(new URI("/api/lieus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lieus : Updates an existing lieu.
     *
     * @param lieu the lieu to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lieu,
     * or with status 400 (Bad Request) if the lieu is not valid,
     * or with status 500 (Internal Server Error) if the lieu couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lieus")
    @Timed
    public ResponseEntity<Lieu> updateLieu(@Valid @RequestBody Lieu lieu) throws URISyntaxException {
        log.debug("REST request to update Lieu : {}", lieu);
        if (lieu.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Lieu result = lieuRepository.save(lieu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lieu.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lieus : get all the lieus.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of lieus in body
     */
    @GetMapping("/lieus")
    @Timed
    public ResponseEntity<List<Lieu>> getAllLieus(Pageable pageable) {
        log.debug("REST request to get a page of Lieus");
        Page<Lieu> page = lieuRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/lieus");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /lieus/:id : get the "id" lieu.
     *
     * @param id the id of the lieu to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lieu, or with status 404 (Not Found)
     */
    @GetMapping("/lieus/{id}")
    @Timed
    public ResponseEntity<Lieu> getLieu(@PathVariable Long id) {
        log.debug("REST request to get Lieu : {}", id);
        Optional<Lieu> lieu = lieuRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lieu);
    }

    /**
     * DELETE  /lieus/:id : delete the "id" lieu.
     *
     * @param id the id of the lieu to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lieus/{id}")
    @Timed
    public ResponseEntity<Void> deleteLieu(@PathVariable Long id) {
        log.debug("REST request to delete Lieu : {}", id);

        lieuRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
