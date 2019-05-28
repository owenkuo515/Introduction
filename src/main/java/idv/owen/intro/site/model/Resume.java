package idv.owen.intro.site.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Resume")
public class Resume extends BaseEntity {

    @Column(name = "name")
    String name;

    @Column(name = "img")
    String img;

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL)
    List<ListContent> listContents;

    public List<ListContent> getListContents() {
        return listContents;
    }

    public void setListContents(List<ListContent> listContents) {
        this.listContents = listContents;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
