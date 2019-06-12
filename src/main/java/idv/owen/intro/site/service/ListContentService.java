package idv.owen.intro.site.service;

import idv.owen.intro.site.model.ListContent;

public interface ListContentService {
    void deleteById(Long id);

    ListContent addOne(ListContent listContent);
}
