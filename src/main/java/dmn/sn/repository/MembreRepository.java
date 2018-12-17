package dmn.sn.repository;

import dmn.sn.domain.Membre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Membre entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MembreRepository extends JpaRepository<Membre, Long> {

    @Query(value = "select distinct membre from Membre membre left join fetch membre.presences",
        countQuery = "select count(distinct membre) from Membre membre")
    Page<Membre> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct membre from Membre membre left join fetch membre.presences")
    List<Membre> findAllWithEagerRelationships();

    @Query("select membre from Membre membre left join fetch membre.presences where membre.id =:id")
    Optional<Membre> findOneWithEagerRelationships(@Param("id") Long id);

}
