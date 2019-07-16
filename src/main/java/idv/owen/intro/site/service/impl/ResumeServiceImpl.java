package idv.owen.intro.site.service.impl;

import idv.owen.intro.site.model.ListContent;
import idv.owen.intro.site.model.Resume;
import idv.owen.intro.site.repositories.ResumeRepository;
import idv.owen.intro.site.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class ResumeServiceImpl implements ResumeService {

    @Autowired
    ResumeRepository resumeRepository;

    @Override
    public Resume reset() {
        resumeRepository.deleteAll();
        Resume resume = new Resume();
        resume.setName("郭政維");
        resume.setImg("bigHeadPhoto.jpg");
        resume.setListContents(Arrays.asList(
                new ListContent("英文姓名", "CHENG-WEI,KUO", resume),
                new ListContent("出生日期", "1991年05月15日", resume),
                new ListContent("現居住所", "新北市中和區中山路三段37巷34號17樓", resume),
                new ListContent("電子郵件", "kuo05150515@gmail.com", resume),
                new ListContent("聯絡電話", "0972-051-545", resume),
                new ListContent("兵役狀況", "役畢(2014年11月)", resume),
                new ListContent("婚姻狀況", "未婚", resume)
        ));
        return addOne(resume);
    }

    @Override
    public Resume addOne(Resume resume) {
        return resumeRepository.save(resume);
    }

    @Override
    public Resume findById() {
        return resumeRepository.findByName("郭政維");
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
