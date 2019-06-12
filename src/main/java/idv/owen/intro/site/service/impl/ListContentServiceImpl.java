package idv.owen.intro.site.service.impl;

import idv.owen.intro.site.model.ListContent;
import idv.owen.intro.site.repositories.ListContentRepository;
import idv.owen.intro.site.service.ListContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListContentServiceImpl implements ListContentService {

    @Autowired
    ListContentRepository listContentRepository;

    @Override
    public void deleteById(Long id) {
        listContentRepository.deleteById(id);
    }
    @Override
    public ListContent addOne(ListContent listContent) {
        return listContentRepository.save(listContent);
    }

}
