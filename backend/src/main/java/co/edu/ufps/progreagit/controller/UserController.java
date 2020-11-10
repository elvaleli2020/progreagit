package co.edu.ufps.progreagit.controller;

import co.edu.ufps.progreagit.exception.NotContentException;
import co.edu.ufps.progreagit.exception.ResourceNotFoundException;
import co.edu.ufps.progreagit.model.User;
import co.edu.ufps.progreagit.payload.ApiResponse;
import co.edu.ufps.progreagit.payload.SearchUser;
import co.edu.ufps.progreagit.payload.UserRequest;
import co.edu.ufps.progreagit.security.CurrentUser;
import co.edu.ufps.progreagit.security.UserPrincipal;
import co.edu.ufps.progreagit.service.ProjectService;
import co.edu.ufps.progreagit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('LEADER')")
    public ResponseEntity<User> getAccountUserLogin(@CurrentUser UserPrincipal userPrincipal) {
        this.checkCredentiales(userPrincipal);
        return  ResponseEntity.ok(userService.getUser(userPrincipal.getId()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LEADER')")
    public ResponseEntity<User> getCurrentUser(@PathVariable(name = "id") Long id) {
        return  ResponseEntity.ok(userService.getUser(id));
    }

    @GetMapping("/")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LEADER') ")
    public ResponseEntity<?> getList() {
        return ResponseEntity.ok(userService.list());
    }

    @PostMapping("/search")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LEADER')")
    public ResponseEntity<?> searchUser(@RequestBody(required=false) SearchUser searchUser){
        return ResponseEntity.ok(userService.searchUser(searchUser));
    }

    @PostMapping("/assing_leader")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> assingLeaderUser(@RequestBody UserRequest userRequest){
        if(userRequest == null || userRequest.getId() == null)
            throw new NotContentException("You need additional data");
        userService.assingLeaderUser(userRequest.getId());
        return ResponseEntity.ok(true);
    }

    @PutMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateUser(@RequestBody UserRequest userRequest,@CurrentUser UserPrincipal userPrincipal) {
        if(userPrincipal==null || userRequest==null || userRequest.getId()!=userPrincipal.getId())
            throw new NotContentException("You need additional data!");
        userService.updateUser(userRequest);
        return ResponseEntity.ok(new ApiResponse(true, "User update successfull"));
    }

    private void checkCredentiales(UserPrincipal userPrincipal){
        if(userPrincipal==null || userPrincipal.getId()==null)
            throw new NotContentException("Unsupported credentials!");
    }
}
