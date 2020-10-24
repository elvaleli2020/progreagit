package co.edu.ufps.progreagit.controller;

import co.edu.ufps.progreagit.exception.BadRequestException;
import co.edu.ufps.progreagit.exception.ResourceNotFoundException;
import co.edu.ufps.progreagit.model.Roles;
import co.edu.ufps.progreagit.model.User;
import co.edu.ufps.progreagit.model.UserNetwork;
import co.edu.ufps.progreagit.payload.ApiResponse;
import co.edu.ufps.progreagit.payload.LoginRequest;
import co.edu.ufps.progreagit.payload.SeachUser;
import co.edu.ufps.progreagit.payload.UserRequest;
import co.edu.ufps.progreagit.repository.UserJPA;
import co.edu.ufps.progreagit.repository.UserNetworkJPA;
import co.edu.ufps.progreagit.security.CurrentUser;
import co.edu.ufps.progreagit.security.UserPrincipal;
import co.edu.ufps.progreagit.service.UserService;
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
    private UserService userService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public User getAccountUser1(@CurrentUser UserPrincipal userPrincipal) {
        return  userService.accountUser(userPrincipal.getId());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('LEADER')")
    public User getCurrentUser(@PathVariable(name = "id") Long id) {
        return  userService.accountUser(id);
    }

    @GetMapping("/")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('LEADER') ")
    public ResponseEntity<?> getList() {
        return ResponseEntity.ok(userService.list());
    }

    @PostMapping("/seach")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LEADER')")
    public ResponseEntity<?> seachUser(@RequestBody(required=false) SeachUser seachUser){
        return ResponseEntity.ok(userService.seachUser(seachUser));
    }

    @PostMapping("/assing_leader")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> assingLeaderUser(@RequestBody UserRequest userRequest){
        return ResponseEntity.ok(userService.assingLeaderUser(userRequest.getId()));
    }

    @PutMapping("/")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('LEADER')")
    public ResponseEntity<?> updateUser(@RequestBody UserRequest userRequest) {
        userService.updateUser(userRequest);
        return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));
    }
}
