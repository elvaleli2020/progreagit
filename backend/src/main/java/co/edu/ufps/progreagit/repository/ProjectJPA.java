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

    @Query("SELECT p FROM Project p WHERE p.acronym like %?1%")
    Optional<List<Project>> findByAcronym(String acronym);

    @Query("SELECT p FROM Project p  WHERE p.name like %?1%")
    Optional<List<Project>> findByName(String name);

    @Query("SELECT p FROM Project p WHERE p.acronym like %?1% OR p.name like %?2%")
    Optional<List<Project>> findByAcronymOrName(String acronym, String name);

    @Query("SELECT p FROM Project p WHERE p.acronym like %?1% AND p.name like %?1% AND p.endDate IS NOT NULL AND p.projectStatus ='aceptada'")
    List<Project> findByTitle(String title);

    @Query("SELECT p FROM Project p JOIN p.users u WHERE u.name like %?1% AND p.endDate IS NOT NULL AND p.projectStatus ='aceptada'")
    List<Project> findbyEstudiante(String estudiante);
}
