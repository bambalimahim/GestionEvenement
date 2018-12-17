package dmn.sn.web.rest;

import com.codahale.metrics.annotation.Timed;
import dmn.sn.domain.Membre;
import dmn.sn.repository.MembreRepository;
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
 * REST controller for managing Membre.
 */
@RestController
@RequestMapping("/api")
public class MembreResource {

    private final Logger log = LoggerFactory.getLogger(MembreResource.class);

    private static final String ENTITY_NAME = "membre";

    private final MembreRepository membreRepository;

    public MembreResource(MembreRepository membreRepository) {
        this.membreRepository = membreRepository;
    }

    /**
     * POST  /membres : Create a new membre.
     *
     * @param membre the membre to create
     * @return the ResponseEntity with status 201 (Created) and with body the new membre, or with status 400 (Bad Request) if the membre has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/membres")
    @Timed
    public ResponseEntity<Membre> createMembre(@Valid @RequestBody Membre membre) throws URISyntaxException {
        log.debug("REST request to save Membre : {}", membre);
        if (membre.getId() != null) {
            throw new BadRequestAlertException("A new membre cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Membre result = membreRepository.save(membre);
        return ResponseEntity.created(new URI("/api/membres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /membres : Updates an existing membre.
     *
     * @param membre the membre to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated membre,
     * or with status 400 (Bad Request) if the membre is not valid,
     * or with status 500 (Internal Server Error) if the membre couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/membres")
    @Timed
    public ResponseEntity<Membre> updateMembre(@Valid @RequestBody Membre membre) throws URISyntaxException {
        log.debug("REST request to update Membre : {}", membre);
        if (membre.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Membre result = membreRepository.save(membre);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, membre.getId().toString()))
            .body(result);
    }

    /**
     * GET  /membres : get all the membres.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of membres in body
     */
    @GetMapping("/membres")
    @Timed
    public ResponseEntity<List<Membre>> getAllMembres(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Membres");
        Page<Membre> page;
        if (eagerload) {
            page = membreRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = membreRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/membres?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /membres/:id : get the "id" membre.
     *
     * @param id the id of the membre to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the membre, or with status 404 (Not Found)
     */
    @GetMapping("/membres/{id}")
    @Timed
    public ResponseEntity<Membre> getMembre(@PathVariable Long id) {
        log.debug("REST request to get Membre : {}", id);
        Optional<Membre> membre = membreRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(membre);
    }

    /**
     * DELETE  /membres/:id : delete the "id" membre.
     *
     * @param id the id of the membre to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/membres/{id}")
    @Timed
    public ResponseEntity<Void> deleteMembre(@PathVariable Long id) {
        log.debug("REST request to delete Membre : {}", id);

        membreRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
