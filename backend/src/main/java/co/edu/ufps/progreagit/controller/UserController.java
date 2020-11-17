package co.edu.ufps.progreagit.controller;

import co.edu.ufps.progreagit.exception.NotContentException;
import co.edu.ufps.progreagit.model.User;
import co.edu.ufps.progreagit.payload.ApiResponse;
import co.edu.ufps.progreagit.payload.SearchUser;
import co.edu.ufps.progreagit.payload.UserRequest;
import co.edu.ufps.progreagit.security.CurrentUser;
import co.edu.ufps.progreagit.security.UserPrincipal;
import co.edu.ufps.progreagit.service.ProjectService;
import co.edu.ufps.progreagit.service.UserService;
import co.edu.ufps.progreagit.util.ControllerUtil;
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

    private ControllerUtil controllerUtil;

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('LEADER')")
    public ResponseEntity<User> getAccountUserLogin(@CurrentUser UserPrincipal userPrincipal) {
        this.controllerUtil.checkCredentiales(userPrincipal);
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
    public ResponseEntity<?> searchUser(@RequestBody(required=false) SearchUser searchUser, @CurrentUser UserPrincipal userPrincipal){
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

    ////////////////// Iteration 2 /////////////////////

    /**
     * Service
     * HU5 RF12
     * @return
     */
    @GetMapping("/project")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUsersForProject(){
        return ResponseEntity.ok(userService.listProject());
    }

    /**
     * Method
     * HU4 RF04
     * @param userPrincipal
     * @param userRequest
     * @return
     */
    @PostMapping("/assingMember")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> assingMembersUser(@CurrentUser UserPrincipal userPrincipal,@RequestBody UserRequest userRequest){
        if(userRequest == null || userRequest.getId() == null)
            throw new NotContentException("You need additional data");
        userService.assingMemberUser(userPrincipal.getId(), userRequest.getId());
        return ResponseEntity.ok(true);
    }

    /**
     * Method Unassing member
     * HU04 RF06
     * @param userPrincipal
     * @param userRequest
     * @return
     */
    @PostMapping("/UnassingMember")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> UnassingMembersUser(@CurrentUser UserPrincipal userPrincipal,@RequestBody UserRequest userRequest){
        if(userRequest == null || userRequest.getId() == null)
            throw new NotContentException("You need additional data");
        userService.unassingMemberUser(userPrincipal.getId(), userRequest.getId());
        return ResponseEntity.ok(true);
    }


}
