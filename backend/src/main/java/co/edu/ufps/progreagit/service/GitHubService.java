package co.edu.ufps.progreagit.service;

import org.kohsuke.github.GHRepository;
import org.springframework.stereotype.Service;

@Service
public class GitHubService {

    private GitHubControl gitHubControl;
    private final String token="ca8bf119b6d4e24479485a6c3ed35bc5f25d2d54";

    public GitHubService() {
        this.gitHubControl = new GitHubControl();
        gitHubControl.create(this.token);
    }

    public String createGitClone(String name, String url){
        String url_clon;
        gitHubControl.getRepository("elvaleli2016/prestashop");
        GHRepository g = gitHubControl.getRepository("elvaleli2020/" + name );
        if(gitHubControl.deleteRepository(g))
            System.out.println("Se elimino reposotorio satisfactoriamente");
        g = gitHubControl.createRepository(name);
        url_clon = g.getSvnUrl();
        try{
            gitHubControl.registerGitWebHook("elvaleli2016/prueba5.git", "elvaleli2020", name);
        }catch (Exception e){
            System.out.println("Salio por error:  " + e);
        }
        System.out.println(url_clon);
        return url_clon;
    }
}
