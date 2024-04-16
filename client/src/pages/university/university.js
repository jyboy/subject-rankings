import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Picker, ScrollView, Image } from '@tarojs/components';
import { useLoad, request, navigateTo, setStorage } from '@tarojs/taro';
import { AtModal, AtModalContent, AtFab } from 'taro-ui';
import { QRCodeSVG } from 'qrcode.react';
import bookshelfImg from '../../assets/images/bookshelf.jpeg';
import categories from '../../data/categories.json';
import locales from '../../data/locales.json';
import subjectMap from '../../data/subjectMap.json';
import useLanguage from '../../hooks/useLanguage';
import { QRCode, GitHub, ArrowRight, Locale } from '../../icons';
import { changeLanguage, toggleLanguage } from '../../states/slice';
import {
  isPC,
  detectLang,
  buildRequestUrl,
  buildLogoUrl,
  buildPageURL,
  rankingToGrade,
  rankingToClass,
  isCodeValid
} from '../../utils';
import './university.scss';

const University = () => {
  const [categoryRange, setCategoryRange] = useState([]);
  const [subjectRange, setSubjectRange] = useState([]);
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [subjectIdx, setSubjectIdx] = useState(0);
  const [universities, setUniversities] = useState([]);
  const [qrOpen, setQROpen] = useState(false);

  const language = useLanguage();
  const dispatch = useDispatch();

  useLoad(() => {
    if (!language) {
      dispatch(changeLanguage(detectLang()));
    }
  });

  useLoad((opts) => {
    if (isCodeValid(opts.subject_code, 'subject')) {
      setCategoryIdx(subjectMap[opts.subject_code].categoryIdx);
      setSubjectIdx(subjectMap[opts.subject_code].subjectIdx);
    }
  });

  useEffect(() => {
    setCategoryRange(
      categories.map((category) => category['name_' + language])
    );
  }, [language]);

  useEffect(() => {
    setSubjectRange(
      categories[categoryIdx].subjects.map(
        (subject) => subject['name_' + language]
      )
    );
  }, [language, categoryIdx]);

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

  const handlePickerColumnChange = (e) => {
    const { column, value } = e.detail;
    if (column === 0) {
      setCategoryIdx(value);
    } else if (column === 1) {
      setSubjectIdx(value);
    }
  };

  const handlePickerChange = (e) => {
    setCategoryIdx(e.detail.value[0]);
    setSubjectIdx(e.detail.value[1]);
  };

  const navigateToSubject = (e) => {
    const { code, name } = e.currentTarget.dataset;
    navigateTo({
      url: `/subject?university_code=${code}&university_name=${name}`
    });
  };

  const handleQROpen = () => {
    setQROpen(true);
  };

  const handleLanguageChange = () => {
    setStorage({
      key: 'language',
      data: language === 'en' ? 'zh' : 'en'
    });
    dispatch(toggleLanguage());
  };

  return (
    <View className="container">
      <ScrollView className="scroll-view" scrollY="true">
        <View className="header">
          <Image className="header-img" mode="aspectFill" src={bookshelfImg} />
          <View className="header-seam"></View>
          <View className={'university-title ' + language}>
            {locales.text.universityRankings[language]}
          </View>
          {isPC() && (
            <View
              className="qrcode-btn"
              role="button"
              aria-label={locales.labels.qrCode[language]}
              tabIndex="0"
              onClick={handleQROpen}
            >
              <QRCode size="1.5rem" />
            </View>
          )}
          <a
            className="github-link"
            aria-label={locales.labels.github[language]}
            href="https://github.com/jyboy/subject-rankings"
            target="_blank"
          >
            <GitHub size="1.5rem" />
          </a>
        </View>
        <View className="picker-wrapper">
          <Picker
            className="picker"
            mode="multiSelector"
            value={[categoryIdx, subjectIdx]}
            range={[categoryRange, subjectRange]}
            textProps={{
              cancelText: locales.labels.cancel[language],
              okText: locales.labels.confirm[language]
            }}
            onColumnChange={handlePickerColumnChange}
            onChange={handlePickerChange}
          >
            <View className="picker-value">
              {categories[categoryIdx].subjects[subjectIdx]['name_' + language]}
            </View>
          </Picker>
          <ArrowRight className="picker-arrow" size="1rem" />
        </View>
        <View role="list">
          {universities.map((item) => {
            return (
              <View
                key={item.code}
                className="university-item"
                role="listitem"
                tabIndex="0"
                data-code={item.code}
                data-name={item.name[language]}
                onClick={navigateToSubject}
                onKeydown={(e) => {
                  if (e.key === 'Enter') {
                    navigateToSubject(e);
                  }
                }}
              >
                <View className="university-left">
                  <Image
                    className="university-logo"
                    src={buildLogoUrl(item.logo)}
                    mode="aspectFit"
                  ></Image>
                </View>
                <View className="university-right">
                  <View className="university-block">
                    <View className="university-name">
                      {item.name[language]}
                    </View>
                    <View className="grade-description">
                      {rankingToGrade(item.ranking, language).description}
                    </View>
                    <View
                      className={'grade-label ' + rankingToClass(item.ranking)}
                    >
                      {rankingToGrade(item.ranking, language).label}
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <View className="credit">{locales.text.credit[language]}</View>
      </ScrollView>
      <AtModal isOpened={qrOpen} onClose={() => setQROpen(false)}>
        <AtModalContent>
          <QRCodeSVG
            value={buildPageURL(
              categories[categoryIdx].subjects[subjectIdx].code
            )}
          />
        </AtModalContent>
      </AtModal>
      <AtFab
        className="fab"
        role="button"
        aria-label={locales.labels.language[language]}
        onClick={handleLanguageChange}
      >
        <Locale size="1.4rem" />
      </AtFab>
    </View>
  );
};

export default University;
