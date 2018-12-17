package dmn.sn.repository;

import dmn.sn.domain.Lieu;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Lieu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LieuRepository extends JpaRepository<Lieu, Long> {

}
