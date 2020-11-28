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

    /**
     * Methodo verify the authenticity of the account
     * HU1 RF1 The system must allow different users to log in
     * @param userPrincipal
     * @return
     */
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
        if(this.controllerUtil.getRolUserPrincipal(userPrincipal).equals("ROLE_ADMIN"))
            return ResponseEntity.ok(userService.searchUserAdmin(searchUser,userPrincipal.getId()));
        return ResponseEntity.ok(userService.searchUserLeader(searchUser));
    }

    /**
     * Method, project leader user permission
     * HU2 RF16,The system must allow the administrator user to give permissions to view and collaborate on the project,
     * to the leading user of the project
     * @param userRequest
     * @return
     */
    @PostMapping("/assing_leader")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> assingLeaderUser(@RequestBody UserRequest userRequest){
        if(userRequest == null || userRequest.getId() == null)
            throw new NotContentException("You need additional data");
        userService.assingLeaderUser(userRequest.getId());
        return ResponseEntity.ok(true);
    }

    /**
     * Method request role to administrator
     * HU2 RF03 The system should allow users to request a role from the administrator
     * @param userRequest
     * @param userPrincipal
     * @return
     */
    @PutMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateUser(@RequestBody UserRequest userRequest,@CurrentUser UserPrincipal userPrincipal) {
        if(userPrincipal==null || userRequest==null || userPrincipal.getId()==null)
            throw new NotContentException("You need additional data!");
        userRequest.setId(userPrincipal.getId());
        userService.updateUser(userRequest);
        return ResponseEntity.ok(new ApiResponse(true, "User update successfull"));
    }

    ////////////////// Iteration 2 /////////////////////

    /**
     * Method, View students
     * HU5 RF12, The system must allow the administrator user to view students with currently active projects
     * @return
     */
    @GetMapping("/project")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUsersForProject(){
        return ResponseEntity.ok(userService.listProject());
    }

    /**
     * Method Assign member
     * HU4 RF04. The system must allow the project leader user to assign a member to a project
     * @param userPrincipal
     * @param userRequest
     * @return
     */
    @PostMapping("/assingMember")
    @PreAuthorize("hasRole('LEADER')")
    public ResponseEntity<?> assingMembersUser(@CurrentUser UserPrincipal userPrincipal,@RequestBody UserRequest userRequest){
        if(userRequest == null || userRequest.getId() == null)
            throw new NotContentException("You need additional data");
        userService.assingMemberUser(userPrincipal.getId(), userRequest.getId());
        return ResponseEntity.ok(true);
    }

    /**
     * Method Edit member
     * HU4 RF05, El sistema debe permitir al usuario líder del proyecto, editar los integrantes del proyecto
     * @param userRequest
     * @param userPrincipal
     * @return
     */
    @PutMapping("/updateForleader")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateForLeader(@RequestBody UserRequest userRequest,@CurrentUser UserPrincipal userPrincipal) {
        if(userPrincipal==null || userRequest==null || userPrincipal.getId()==null)
            throw new NotContentException("You need additional data!");
        userRequest.setId(userPrincipal.getId());
        userService.updateUser(userRequest);
        return ResponseEntity.ok(new ApiResponse(true, "User update successfull"));
    }
    /**
     * Method Unassing member
     * HU04 RF06,The system must allow the project leader user to deallocate the project members
     * @param userPrincipal
     * @param userRequest
     * @return
     */
    @PostMapping("/unassingMember")
    @PreAuthorize("hasRole('LEADER')")
    public ResponseEntity<?> unassingMembersUser(@CurrentUser UserPrincipal userPrincipal,@RequestBody UserRequest userRequest){
        if(userRequest == null || userRequest.getId() == null)
            throw new NotContentException("You need additional data");
        userService.unassingMemberUser(userPrincipal.getId(), userRequest.getId());
        return ResponseEntity.ok(true);
    }

    /**
     * Methodo View members by the project leader
     * HU04 RF07, The system must allow the project leader user to view the information of the project members
     * @param userPrincipal
     * @return
     */
    @GetMapping("/group")
    @PreAuthorize("hasRole('LEADER')")
    public ResponseEntity<?> belongGroup(@CurrentUser UserPrincipal userPrincipal){
        return ResponseEntity.ok(userService.getGroup(userPrincipal.getId()));
    }
}
