package co.edu.ufps.progreagit.controller;

import co.edu.ufps.progreagit.service.GitHubControl;
import co.edu.ufps.progreagit.service.GitHubService;
import org.kohsuke.github.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/")
public class BaseController {

    @GetMapping("/")
    public String index(){
        return "Bienvenido ProgreaGit Backend 1-12";
    }

    @GetMapping("/git")
    public String pruebaGitLab(){
        String resp= "algo";
        try {
//            GITHUB
            GitHubService gitHubService = new GitHubService();
            gitHubService.createGitClone("prueba5","https://github.com/elvaleli2016/prestashop");

//            String token="ca8bf119b6d4e24479485a6c3ed35bc5f25d2d54";
//            GitHub github = new GitHubBuilder().withOAuthToken(token).build();
//
//            GHRepository g1 = github.getRepository("elvaleli2016/prestashop");
//            System.out.println(g1.getFullName());
//
//            GHRepository g = github.getRepository("elvaleli2020/prueba5");
//            g.delete();
//
//            g = github.createRepository("prueba5","estoy realizando una prueba","https://github.com/elvaleli2016/prestashop",true);
//            System.out.println(g.getFullName());
////            gitHubControl.registerGitWebHook("elvaleli2016/prestashop","elvaleli2020","prueba5");
//
//
//            if(github.isCredentialValid())
//                System.out.println("Paso");
//            else System.out.println("No paso");
        }catch (Exception e){
            return "Sali por error " + e.getMessage();
        }
        return resp;
    }




}
