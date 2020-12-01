package co.edu.ufps.progreagit.service;

import org.springframework.stereotype.Service;

@Service
public class GitHubService {
    private GitHubControl gitHubControl;
    private final String token="ca8bf119b6d4e24479485a6c3ed35bc5f25d2d54";

    public GitHubService() {
        this.gitHubControl = new GitHubControl();
        gitHubControl.create(this.token);
    }

    public void createGitClone(){

        gitHubControl.getRepository("elvaleli2016/prestashop");
        gitHubControl.createRepository("prueba5");
    }
}
