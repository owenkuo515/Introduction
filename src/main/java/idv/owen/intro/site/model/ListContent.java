package idv.owen.intro.site.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "ListContent")
@JsonIgnoreProperties(value = {"resume"})
public class ListContent extends BaseEntity {

    public ListContent() {
    }

    public ListContent(String contentKey, String value) {
        this.contentKey = contentKey;
        this.value = value;
    }

    public ListContent(String contentKey, String value, Resume resume) {
        this.contentKey = contentKey;
        this.value = value;
        this.resume = resume;
    }

    @Column(name = "contentKey")
    String contentKey;
    @Column(name = "value")
    String value;
    @ManyToOne
    @JoinColumn(name = "resume_id")
    Resume resume;

    public String getContentKey() {
        return contentKey;
    }

    public void setContentKey(String contentKey) {
        this.contentKey = contentKey;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Resume getResume() {
        return resume;
    }

    public void setResume(Resume resume) {
        this.resume = resume;
    }
}
