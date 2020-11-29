package co.edu.ufps.progreagit.controller;

import co.edu.ufps.progreagit.exception.NotContentException;
import co.edu.ufps.progreagit.model.Project;
import co.edu.ufps.progreagit.payload.ApiResponse;
import co.edu.ufps.progreagit.payload.SearchProject;
import co.edu.ufps.progreagit.security.CurrentUser;
import co.edu.ufps.progreagit.security.UserPrincipal;
import co.edu.ufps.progreagit.service.ProjectService;
import co.edu.ufps.progreagit.util.ControllerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/leader")
    @PreAuthorize("hasRole('LEADER')")
    public ResponseEntity<?> projectBelong(@CurrentUser UserPrincipal userPrincipal){
        ControllerUtil.checkCredentiales(userPrincipal);
        return ResponseEntity.ok(projectService.findByMember(userPrincipal.getId()));
    }

    /**
     * Method View projects by title(name), autors, area, years
     * HU5 RF11, The system must allow the administrator user to view the projects by classification,
     * it will be displayed in a list with pagination
     * @return
     */
    @PostMapping("/show")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> showAdmin(@RequestBody(required=false) SearchProject searchProject){ //
        return ResponseEntity.ok(projectService.showProject(searchProject));
    }

    /**
     * Method, View project by project leader
     * HU03 RF09, The system must allow the leading user of the project to view the information
     * of the registered project
     * @param userPrincipal
     * @return
     */
    @PutMapping("/leader")
    @PreAuthorize("hasRole('LEADER')")
    public ResponseEntity<?> updateLeader(@CurrentUser UserPrincipal userPrincipal, @RequestBody Project project){
        Project project1 = projectService.findByMember(userPrincipal.getId());
        if(project1==null&&project==null)
            throw new NotContentException("You do not have permission to modify this project");
        project.setIdProject(project1.getIdProject());
        projectService.updateLeader(project);
        return ResponseEntity.ok(new ApiResponse(true, "Project update successfull"));
    }

//    @PostMapping("/leader_member")
//    @PreAuthorize("hasRole('LEADER')")
//    public ResponseEntity<?> assingMember(@CurrentUser UserPrincipal userPrincipal, @RequestParam(value = "idUser") Long idUser){
//        projectService.assingMember(userPrincipal.getId(), idUser);
//        return ResponseEntity.ok(true);
//    }
    //////// ITERATION 2 /////////////////

    @PutMapping("/qualification")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateQualification(@RequestBody Project project){
        return ResponseEntity.ok(new ApiResponse(
                projectService.updateQualification(project),
                "Project update successfull"));
    }

    /**
     * Method List projects to external users
     * HU5 RF17 The system must allow unregistered users to see the basic information of approved projects
     * @return
     */
    @PostMapping("/showGuest")
    public ResponseEntity<?> showGuest(@RequestBody(required=false) SearchProject searchProject){ //
        return ResponseEntity.ok(projectService.showProjectGuest(searchProject));
    }
    @GetMapping("/prueba")
    public String index(){
        return "Bienvenido ProgreaGit Backend 21";
    }

}
