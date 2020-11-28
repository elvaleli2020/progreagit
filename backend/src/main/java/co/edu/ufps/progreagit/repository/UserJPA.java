package co.edu.ufps.progreagit.repository;

import co.edu.ufps.progreagit.model.Roles;
import co.edu.ufps.progreagit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserJPA extends JpaRepository<User, Long> {

    //CODE
    @Query("SELECT u FROM User u JOIN u.rol r WHERE u.code=?1 AND r.id!=2")
    Optional<User> findByCode(String code);

    @Query("SELECT u FROM User u JOIN u.rol r WHERE u.code=?1 AND u.petitionLeader=?2 AND r.id=1")
    Optional<User> findByCodeAdmin(String code, Boolean petition);

    @Query("SELECT u FROM User u left join u.projects p JOIN u.rol r WHERE u.code=?1 AND r.id=1 AND p.idProject IS NULL")
    Optional<User> findByCodeAdminNotPetition(String code);

    //EMAIL
//    @Query("SELECT u FROM User u  left join u.projects p join u.rol r WHERE u.email like %?1% AND r.id=1 AND u.code IS NOT NULL AND p.idProject IS NULL")
    //General
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u  LEFT JOIN u.projects p WHERE u.email like %?1% AND u.code IS NOT NULL AND p.idProject IS NULL")
    List<User> findbyEmailAdminNotPetition(String email);

    @Query("SELECT u FROM User u left join u.projects p WHERE u.name like %?1% AND u.code IS NOT NULL AND u.petitionLeader=$2 AND p.idProject IS NULL")
    List<User> findbyEmailAdmin(String email, Boolean petition);

    //NAME
    @Query("SELECT u FROM User u LEFT JOIN u.projects p WHERE u.name like %?1% AND u.code IS NOT NULL AND p.idProject IS NULL")
    List<User> findbyNameAdminNotPetition(String email);

    @Query("SELECT u FROM User u LEFT JOIN u.projects p WHERE u.name like %?1% AND u.code IS NOT NULL AND u.petitionLeader=$2 AND p.idProject IS NULL")
    List<User> findbyNameAdmin(String email, Boolean petition);

    Optional<List<User>> findByRol(Roles roles);

    /**
     * Query for leader
     * @return
     */
    @Query("SELECT u from User u left join u.projects p JOIN u.rol r WHERE u.code IS NOT NULL AND r.id=1 AND (p.idProject IS NULL)")
    List<User> findForLeader();

    @Query("SELECT u FROM User u left join u.projects p JOIN u.rol r WHERE p.idProject IS NULL and r.id=1 AND u.code IS NOT NULL")
    List<User> findByGeneral();

    Boolean existsByEmail(String email);

    @Query("select u from User u join u.projects p where p.endDate is null")
    List<User> findByProjectsEndDateIsNull();
}
