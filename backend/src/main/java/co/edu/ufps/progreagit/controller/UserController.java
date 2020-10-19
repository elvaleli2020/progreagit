package co.edu.ufps.progreagit.controller;

import co.edu.ufps.progreagit.exception.BadRequestException;
import co.edu.ufps.progreagit.exception.ResourceNotFoundException;
import co.edu.ufps.progreagit.model.User;
import co.edu.ufps.progreagit.model.UserNetwork;
import co.edu.ufps.progreagit.payload.ApiResponse;
import co.edu.ufps.progreagit.payload.UserRequest;
import co.edu.ufps.progreagit.repository.UserJPA;
import co.edu.ufps.progreagit.repository.UserNetworkJPA;
import co.edu.ufps.progreagit.security.CurrentUser;
import co.edu.ufps.progreagit.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserJPA userRepository;

    @Autowired
    private UserNetworkJPA userNetworkJPA;

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
    @GetMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getList() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping("/")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('')")
    public ResponseEntity<?> updateUser(@RequestBody UserRequest userRequest) {

        User user = userRepository.findById(userRequest.getId())
                .orElse(null);
        if(user == null)
            throw new BadRequestException("User not fount");
        if(user.getEmail().equals(userRequest.getEmail())) {
            throw new BadRequestException("Email address not exist");
        }

        user.setIdUser(userRequest.getId());
        user.setAddress(userRequest.getAddress());
        user.setCellphone(userRequest.getCellphone());
        user.setCode(userRequest.getCode());
        user.setPersonalEmail(userRequest.getPersonalEmail());

        userRepository.save(user);

        List<UserNetwork> userNetworks = new ArrayList<>();
        UserNetwork userNetwork;
        if(userRequest.getUserNetworking()!=null) {
            for (String webAddress : userRequest.getUserNetworking()) {
                userNetwork = new UserNetwork();
                userNetwork.setUser(user);
                userNetwork.setWebAddress(webAddress);
                userNetworkJPA.save(userNetwork);
            }
        }

        return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));
    }
}
