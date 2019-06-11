package idv.owen.intro.site.service;

import idv.owen.intro.site.model.Resume;

public interface ResumeService {
    Resume addOne(Resume resume);

    Resume findById();

    void changeImg(Long resumeId, String imgSrc);
}
