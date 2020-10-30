package co.edu.ufps.progreagit.controller;

import co.edu.ufps.progreagit.exception.NotContentException;
import co.edu.ufps.progreagit.model.Project;
import co.edu.ufps.progreagit.security.CurrentUser;
import co.edu.ufps.progreagit.security.UserPrincipal;
import co.edu.ufps.progreagit.service.ProjectService;
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
        return ResponseEntity.ok(projectService.findByLeader(userPrincipal.getId()));
    }

    @PutMapping("/leader")
    @PreAuthorize("hasRole('LEADER')")
    public ResponseEntity<?> updateLeader(@CurrentUser UserPrincipal userPrincipal, @RequestBody Project project){
        Project project1 = projectService.findByLeader(userPrincipal.getId());
        if(project1==null || project1!=null && project.getIdProject() != project1.getIdProject())
            throw new NotContentException("You do not have permission to modify this project");
        projectService.updateLeader(project);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/leader_member")
    @PreAuthorize("hasRole('LEADER')")
    public ResponseEntity<?> assingMember(@CurrentUser UserPrincipal userPrincipal, @RequestParam(value = "idUser") Long idUser){
        projectService.assingMember(userPrincipal.getId(), idUser);
        return ResponseEntity.ok(true);
    }
}
