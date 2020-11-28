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
@RequestMapping("/projects")
public class ProjectsController {

    @Autowired
    private ProjectService projectService;

    /**
     * Method, View project by project leader
     * HU03 RF09, The system must allow the leading user of the project to view the information
     * of the registered project
     * @param userPrincipal
     * @return
     */
    @GetMapping("/leader")
    @PreAuthorize("hasRole('LEADER')")
    public ResponseEntity<?> projectBelong(@CurrentUser UserPrincipal userPrincipal){
        ControllerUtil.checkCredentiales(userPrincipal);
        return ResponseEntity.ok(projectService.findByMember(userPrincipal.getId()));
    }

    /**
     * Method show projects by title(name), autors, area, years
     * HU5 RF11
     * @return
     */
    @GetMapping("/show")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> showAdmin(@RequestBody(required=false) SearchProject searchProject){ //
        return ResponseEntity.ok(projectService.showProject(searchProject));
    }

    /**
     * Method, Update project
     * HU3 RF10, The system should allow the project lead user to edit the registered project information
     * @param userPrincipal
     * @param project
     * @return
     */
    @PutMapping("/leader")
    @PreAuthorize("hasRole('LEADER')")
    public ResponseEntity<?> updateLeader(@CurrentUser UserPrincipal userPrincipal, @RequestBody Project project){
        Project project1 = projectService.findByMember(userPrincipal.getId());
        if(project1==null || project1!=null && project.getIdProject() != project1.getIdProject())
            throw new NotContentException("You do not have permission to modify this project");
        projectService.updateLeader(project);
        return ResponseEntity.ok(new ApiResponse(true, "Project update successfull"));
    }
//
//    /**
//     * Method,
//     * @param userPrincipal
//     * @param idUser
//     * @return
//     */
//    @PostMapping("/leader_member")
//    @PreAuthorize("hasRole('LEADER')")
//    public ResponseEntity<?> assingMember(@CurrentUser UserPrincipal userPrincipal, @RequestParam(value = "idUser") Long idUser){
//        projectService.assingMember(userPrincipal.getId(), idUser);
//        return ResponseEntity.ok(true);
//    }
    //////// ITERATION 2 /////////////////

    /**
     * Method, Rate project
     * HU5 RF13, The system must allow the administrator user to give a qualification to the project
     * @param project
     * @return
     */
    @PutMapping("/qualification")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateQualification(@RequestBody Project project){
        return ResponseEntity.ok(new ApiResponse(
                projectService.updateQualification(project),
                "Project update successfull"));
    }
}
