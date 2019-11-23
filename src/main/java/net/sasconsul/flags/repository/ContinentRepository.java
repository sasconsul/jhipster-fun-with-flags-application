package net.sasconsul.flags.repository;
import net.sasconsul.flags.domain.Continent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Continent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContinentRepository extends JpaRepository<Continent, Long> {

}
