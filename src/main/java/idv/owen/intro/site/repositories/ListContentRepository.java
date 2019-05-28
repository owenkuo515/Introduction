package idv.owen.intro.site.repositories;

import idv.owen.intro.site.model.ListContent;
import idv.owen.intro.site.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListContentRepository extends JpaRepository<ListContent, Long> {

}
