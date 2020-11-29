package co.edu.ufps.progreagit.repository;

import co.edu.ufps.progreagit.model.Project;
import co.edu.ufps.progreagit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjectJPA extends JpaRepository<Project, Integer> {

    Optional<Project> findByUsersIdUserAndEndDateIsNull(Long idUser);

    @Query("select p from Project p join p.users u where p.endDate is null and u.idUser = :idUser")
    Optional<Project> findByUsersIdUser(@Param("idUser") Long idUser);

    Optional<List<Project>> findByAcronym(String acronym);
    Optional<List<Project>> findByName(String name);
    Optional<List<Project>> findByAcronymOrName(String acronym, String name);

    @Query("SELECT p FROM Project p WHERE p.acronym like %?1% AND p.name like %?1% AND p.endDate IS NOT NULL AND p.projectStatus ='ACEPTADO'")
    List<Project> findByTitle(String title);

    @Query("SELECT p FROM Project p JOIN p.users u WHERE u.name like %?1% AND p.endDate IS NOT NULL AND p.projectStatus ='ACEPTADO'")
    List<Project> findbyEstudiante(String estudiante);

}
