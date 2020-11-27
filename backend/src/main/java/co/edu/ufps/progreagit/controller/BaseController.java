package co.edu.ufps.progreagit.controller;

import co.edu.ufps.progreagit.service.GitControl;
import co.edu.ufps.progreagit.service.GitHubControl;
import org.kohsuke.github.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class BaseController {

    @GetMapping("/index")
    public String index(){
        return "Bienvenido ProgreaGit Backend 21";
    }

    @GetMapping("/")
    public String pruebaGitLab(){
        String resp= "algo";
        try {
//            GITHUB
            GitHubControl gitHubControl = new GitHubControl();
            GitHub github = new GitHubBuilder().withOAuthToken("ca8bf119b6d4e24479485a6c3ed35bc5f25d2d54").build();

            GHRepository g1 = github.getRepository("elvaleli2016/prestashop");



            GHRepository g = github.getRepository("elvaleli2020/prueba5");
            g.delete();

            g = github.createRepository("prueba5","estoy realizando una prueba","https://github.com/elvaleli2016/prestashop",true);

            gitHubControl.registerGitWebHook("elvaleli2016/prestashop","elvaleli2020","prueba5");


            if(github.isCredentialValid())
                System.out.println("Paso");
            else System.out.println("No paso");
        }catch (Exception e){
            return "Sali por error " + e.getMessage();
        }
        return resp;
    }




}
