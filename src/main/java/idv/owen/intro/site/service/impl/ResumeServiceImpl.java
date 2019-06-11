package idv.owen.intro.site.service.impl;

import idv.owen.intro.site.model.Resume;
import idv.owen.intro.site.repositories.ResumeRepository;
import idv.owen.intro.site.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResumeServiceImpl implements ResumeService {

    @Autowired
    ResumeRepository resumeRepository;

    @Override
    public Resume addOne(Resume resume) {
        return resumeRepository.save(resume);
    }

    @Override
    public Resume findById() {
        return resumeRepository.findById(1L).orElse(null);
    }

    public Resume findById(Long id) {
        return resumeRepository.findById(id).orElse(null);
    }

    @Override
    public void changeImg(Long resumeId, String imgSrc) {
        Resume resume = findById(resumeId);
        resume.setImg(imgSrc);
        resumeRepository.save(resume);
    }
}
