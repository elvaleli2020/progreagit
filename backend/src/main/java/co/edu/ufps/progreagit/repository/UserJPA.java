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

    Optional<User> findByEmail(String email);

    Optional<List<User>> findByEmailContainingAndIdUserNot(String email, Long idUser);

    Optional<List<User>> findByNameContainingAndIdUserNot(String name, Long idUser);

    Optional<List<User>> findByRol(Roles roles);

    Optional<List<User>> findByidUserNot(Long idUser);

    Boolean existsByEmail(String email);

    @Query("select u from User u join u.projects p where p.endDate is null")
    List<User> findByProjectsEndDateIsNull();
}
