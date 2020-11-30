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

    ////////////// ADMIN ////////////////

    @Query("select p from Project p join p.users u where p.endDate is null and u.idUser = :idUser")
    Optional<Project> findByUsersIdUser(@Param("idUser") Long idUser);


            //NAME
    @Query("SELECT p FROM Project p WHERE p.acronym like %?1% OR p.name like %?1%")
    Optional<List<Project>> findByName(String name);

    @Query("SELECT p FROM Project p WHERE (p.acronym like %?1% OR p.name like %?1%) AND p.projectStatus= ?2")
    List<Project>  findByNameAndState(String name, String status);

    @Query("SELECT p FROM Project p WHERE (p.acronym like %?1% OR p.name like %?1%) AND p.projectStatus= ?2 AND p.qualification=?3")
    List<Project>  findByNameAndStateAndQualification(String name, String status, String qualification);


        //KEYBOARDS
    @Query("SELECT p FROM Project p WHERE p.keywords like %?1%")
    List<Project> findByKeyword(String keyword);

    @Query("SELECT p FROM Project p WHERE p.keywords like %?1% AND p.projectStatus= ?2")
    List<Project>  findByKeywordAndState(String keyword, String status);

    @Query("SELECT p FROM Project p WHERE p.keywords like %?1% AND p.projectStatus= ?2 AND p.qualification=?3")
    List<Project>  findByKeywordAndStateAndQualification(String keyword, String status, String qualification);


        //AUTOR
    @Query("SELECT p FROM Project p JOIN p.users u WHERE u.name like %?1%")
    List<Project> findByAutor(String autor);

    @Query("SELECT p FROM Project p JOIN p.users u WHERE u.name like %?1% AND p.projectStatus= ?2")
    List<Project>  findByAutorAndState(String autor, String status);

    @Query("SELECT p FROM Project p JOIN p.users u WHERE u.name like %?1% AND p.projectStatus= ?2 AND p.qualification=?3")
    List<Project>  findByAutorAndStateAndQualification(String autor, String status, String qualification);

      //MENTOR
    @Query("SELECT p FROM Project p WhERE p.director like %?1% ")
    List<Project> findByMentor(String mentor);

    @Query("SELECT p FROM Project p WHERE p.director like %?1% AND p.projectStatus= ?2")
    List<Project>  findByMentorAndState(String mentor, String status);

    @Query("SELECT p FROM Project p WHERE p.director like %?1% AND p.projectStatus= ?2 AND p.qualification=?3")
    List<Project>  findByMentorAndStateAndQualification(String mentor, String status, String qualification);


    ////////// INVITADO //////////

    @Query("SELECT p FROM Project p WHERE p.acronym like %?1% AND p.name like %?1% AND p.endDate IS NOT NULL AND p.projectStatus ='aceptada'")
    List<Project> findByTitle(String title);

    @Query("SELECT p FROM Project p JOIN p.users u WHERE u.name like %?1% AND p.endDate IS NOT NULL AND p.projectStatus ='aceptada'")
    List<Project> findbyEstudiante(String estudiante);

    @Query("SELECT p FROM Project p WHERE p.endDate IS NOT NULL AND p.projectStatus ='aceptada'")
    List<Project> findByInvidado();
}
