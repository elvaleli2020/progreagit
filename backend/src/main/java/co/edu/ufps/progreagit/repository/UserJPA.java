package co.edu.ufps.progreagit.repository;

import co.edu.ufps.progreagit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserJPA extends JpaRepository<User, Long> {

    Optional<User> findByIdUser(Long idUser);

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

}
