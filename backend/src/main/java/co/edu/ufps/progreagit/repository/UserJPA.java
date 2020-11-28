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

    Optional<User> findByCode(String code);

//    @Query("SELECT u FROm User u FROM  ")
//    Optional<User> findByCodeAdmin(String code);

    Optional<User> findByEmail(String email);

    Optional<List<User>> findByEmailContainingAndIdUserNotAndCodeNotNull(String email, Long idUser);

    Optional<List<User>> findByNameContainingAndIdUserNotAndCodeNotNull(String name, Long idUser);

    Optional<List<User>> findByRol(Roles roles);

    /**
     * Query for leader
     * @return
     */
    @Query("SELECT u from User u left join u.projects p JOIN u.rol r WHERE u.code IS NOT NULL AND r.id=1 AND (p.idProject IS NULL)")
    List<User> findForLeader();

    Optional<List<User>> findByidUserNot(Long idUser);

    List<User> findByidUserNotAndCodeIsNotNull(Long idUser);
//    @Query("select u from User u  join r u.rol where r.id!=2 and u.petitionLeader=1")
//    List<User> findByPetitionLeader();

    Boolean existsByEmail(String email);

    @Query("select u from User u join u.projects p where p.endDate is null")
    List<User> findByProjectsEndDateIsNull();
}
