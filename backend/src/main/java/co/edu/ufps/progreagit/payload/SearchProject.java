package co.edu.ufps.progreagit.payload;

public class SearchProject {
    private String acronym;
    private String name;
    private String autor;
    private String keywords;
    private String area;
    private String estado;
    private String qualification;
    private String student;
    private String mentor;
    private int dateInit;
    private int dateLimit;

    public String getAcronym() {
        return acronym;
    }

    public void setAcronym(String acronym) {
        this.acronym = acronym;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public int getDateInit() {
        return dateInit;
    }

    public void setDateInit(int dateInit) {
        this.dateInit = dateInit;
    }

    public int getDateLimit() {
        return dateLimit;
    }

    public void setDateLimit(int dateLimit) {
        this.dateLimit = dateLimit;
    }

    public String getStudent() {
        return student;
    }

    public void setStudent(String student) {
        this.student = student;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getMentor() {
        return mentor;
    }

    public void setMentor(String mentor) {
        this.mentor = mentor;
    }
}
