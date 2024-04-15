import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Picker, ScrollView, Image } from '@tarojs/components';
import { getSystemInfoSync, useLoad, request, navigateTo } from '@tarojs/taro';
import { AtFab } from 'taro-ui';
import categories from '../../data/categories.json';
import locales from '../../data/locales.json';
import subjectMap from '../../data/subjectMap.json';
import useLanguage from '../../hooks/useLanguage';
import { EnglishToChinese } from '../../icons/EnglishToChinese.js';
import { GitHub } from '../../icons/GitHub.js';
import { changeLanguage, toggleLanguage } from '../../states/slice';
import { rankingToGrade } from '../../utils/grade.js';
import { buildRequestUrl, buildLogoUrl, isCodeValid } from '../../utils/url.js';
import './university.scss';

const University = () => {
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [subjectIdx, setSubjectIdx] = useState(0);
  const [universities, setUniversities] = useState([]);

  const language = useLanguage();
  const dispatch = useDispatch();

  useLoad(() => {
    if (!language) {
      dispatch(
        changeLanguage(new Intl.Locale(getSystemInfoSync().language).language)
      );
    }
  });

  useLoad((opts) => {
    if (isCodeValid(opts.subject_code, 'subject')) {
      setCategoryIdx(subjectMap[opts.subject_code].categoryIdx);
      setSubjectIdx(subjectMap[opts.subject_code].subjectIdx);
    }
  });

  useEffect(() => {
    requestUniversities(categories[categoryIdx].subjects[subjectIdx].code);
  }, [categoryIdx, subjectIdx]);

  const requestUniversities = (subject_code) => {
    request({
      url: buildRequestUrl(subject_code, 'university'),
      success: (res) => {
        setUniversities(res.data.universities);
      }
    });
  };

  const handleCategoryPickerChange = (e) => {
    setCategoryIdx(+e.detail.value);
    setSubjectIdx(0);
  };
  const handleSubjectPickerChange = (e) => {
    setSubjectIdx(+e.detail.value);
  };

  const navigateToSubject = (e) => {
    const { code, name } = e.currentTarget.dataset;
    navigateTo({
      url: `/subject?university_code=${code}&university_name=${name}`
    });
  };

  return (
    <View className="container">
      <View className="selector">
        <Picker
          className="picker"
          onChange={handleCategoryPickerChange}
          value={categoryIdx}
          range={categories}
          rangeKey={'name_' + language}
          textProps={{
            cancelText: 'Cancel',
            okText: 'OK'
          }}
        >
          <View className="picker-wrapper">
            {categories[categoryIdx]['name_' + language]}
          </View>
        </Picker>
        <Picker
          className="picker"
          onChange={handleSubjectPickerChange}
          value={subjectIdx}
          range={categories[categoryIdx].subjects}
          rangeKey={'name_' + language}
        >
          <View className="picker-wrapper">
            {categories[categoryIdx].subjects[subjectIdx]['name_' + language]}
          </View>
        </Picker>
        <a
          className="github-link"
          href="https://github.com/jyboy/subject-rankings"
          target="_blank"
        >
          <GitHub size="1.5rem" />
        </a>
      </View>
      <ScrollView className="university-list" scrollY="true">
        {universities.map((item) => {
          return (
            <View
              key={item.code}
              className="university-item"
              data-code={item.code}
              data-name={item.name[language]}
              onClick={navigateToSubject}
            >
              <View className="university-left">
                <Image
                  className="university-logo"
                  src={buildLogoUrl(item.logo)}
                  mode="aspectFit"
                ></Image>
              </View>
              <View className="university-right">
                <View className="university-right-wrapper">
                  <View className="university-name">{item.name[language]}</View>
                  <View className="grade-description">
                    {rankingToGrade(item.ranking, language).description}
                  </View>
                  <View className="grade-label">
                    {rankingToGrade(item.ranking, language).label}
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        <View className="credit">{locales.text.credit[language]}</View>
      </ScrollView>
      <AtFab
        className="fab"
        onClick={() => {
          dispatch(toggleLanguage());
        }}
      >
        <EnglishToChinese size="1.5rem" />
      </AtFab>
    </View>
  );
};

export default University;
