package dmn.sn.repository;

import dmn.sn.domain.Presence;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Presence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PresenceRepository extends JpaRepository<Presence, Long> {

}
