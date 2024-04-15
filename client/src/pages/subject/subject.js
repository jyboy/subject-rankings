import { useEffect, useState } from 'react';
import { View, Image, ScrollView, Button, Text } from '@tarojs/components';
import { useLoad, request, redirectTo, navigateBack } from '@tarojs/taro';
import { AtFab } from 'taro-ui';
import honorImg from '../../assets/honor.png';
import locales from '../../data/locales.json';
import useLanguage from '../../hooks/useLanguage';
import { ArrowGoBack } from '../../icons/ArrowGoBack';
import { rankingToGrade } from '../../utils/grade';
import { buildRequestUrl, isCodeValid } from '../../utils/url';
import './subject.scss';

const Subject = () => {
  const [university, setUniversity] = useState({
    code: '10001',
    name: 'Peking University'
  });
  const [subjects, setSubjects] = useState([]);

  const language = useLanguage();

  useLoad((opts) => {
    if (
      isCodeValid(opts.university_code, 'university') &&
      opts.university_name
    ) {
      setUniversity({
        code: opts.university_code,
        name: decodeURIComponent(opts.university_name)
      });
    }
  });

  useEffect(() => {
    requestUniversities(university.code);
  }, [university]);

  const requestUniversities = (university_code) => {
    request({
      url: buildRequestUrl(university_code, 'subject'),
      success: (res) => {
        setSubjects(res.data.subjects);
      }
    });
  };

  const navigateToUniversity = (e) => {
    const { code } = e.currentTarget.dataset;
    redirectTo({
      url: `/university?subject_code=${code}`
    });
  };

  return (
    <View className="container">
      <View className="background">
        <View className="title">{locales.text.subjectRankings[language]}</View>
        <View className="subtitle">{university.name}</View>
        <Image className="honor" src={honorImg}></Image>
      </View>
      <ScrollView className="subject-list" scrollY="true">
        <View className="subject-item subject-title">
          <View className="subject-name">
            {locales.text.subjectName[language]}
          </View>
          <View className="subject-result">
            {locales.text.subjectResult[language]}
          </View>
        </View>
        {subjects.map((item) => {
          return (
            <View key={item.code} className="subject-item">
              <View className="subject-name">
                <Button data-code={item.code} onClick={navigateToUniversity}>
                  {item.name[language]}
                </Button>
              </View>
              <View className="subject-result">
                <Text className="subject-grade">
                  {rankingToGrade(item.ranking).label}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <AtFab className="fab" onClick={navigateBack}>
        <ArrowGoBack size="1.5rem" />
      </AtFab>
    </View>
  );
};

export default Subject;
