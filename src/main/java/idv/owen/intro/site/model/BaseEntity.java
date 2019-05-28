package idv.owen.intro.site.model;

import javax.persistence.*;

/**
 * Created by Eclair
 * on 2019/1/3.
 */

@MappedSuperclass
public class BaseEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    private Date createDate;
//    private Date lastUpdateDate;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
