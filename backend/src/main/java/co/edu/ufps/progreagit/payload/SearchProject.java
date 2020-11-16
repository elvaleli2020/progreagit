package co.edu.ufps.progreagit.payload;

public class SearchProject {
    private String acronym;
    private String name;
    private SearchUser autor;
    private String area;
    private String estado;
    private int yearInit;
    private int yearLimit;

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

    public SearchUser getAutor() {
        return autor;
    }

    public void setAutor(SearchUser autor) {
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

    public int getYearInit() {
        return yearInit;
    }

    public void setYearInit(int yearInit) {
        this.yearInit = yearInit;
    }

    public int getYearLimit() {
        return yearLimit;
    }

    public void setYearLimit(int yearLimit) {
        this.yearLimit = yearLimit;
    }
}
