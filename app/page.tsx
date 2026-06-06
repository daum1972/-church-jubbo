'use client';

import { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const defaultData = {
  date: '2026년 6월 8일',
  sermonTitle: '"두려워하지 말라, 내가 너와 함께하노라"',
  sermonSeries: '시리즈 · 기쁨으로 사는 삶',
  bibleVerse: '이사야 41장 10절',
  sermonContent: '하나님은 우리가 홀로 광야를 걷는다고 느낄 때에도 손을 놓지 않으십니다. 두려움이 아닌 믿음으로, 오늘 이 자리에서 하나님의 동행을 새롭게 경험하세요.',
  announcements: [
    { day: '8', dow: '일', tag: '예배', text: '예배 후 새 가족 환영 모임이 있습니다.' },
    { day: '11', dow: '수', tag: '소그룹', text: '수요 소그룹 모임이 오후 7시 30분에 진행됩니다.' },
    { day: '15', dow: '일', tag: '특별', text: '다음 주일 찬양예배가 예정되어 있습니다.' },
  ],
};

export default function Home() {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'jubbo', 'current');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data() as typeof defaultData);
        }
      } catch (e) {
        console.error('데이터 불러오기 실패:', e);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', background: '#f0ede6', minHeight: '100vh', fontFamily: "'Noto Sans KR', sans-serif" }}>

      {/* 헤더 이미지 */}
      <div style={{
        width: '100%',
        aspectRatio: '2/1',
        backgroundImage: 'url("/church.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      </div>

      {/* 날짜 바 */}
      <div style={{ background: '#1e5c3e', padding: '10px 20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {[data.date, '주일예배', '오전 11:00'].map((chip) => (
          <span key={chip} style={{ background: 'rgba(255,255,255,0.15)', border: '0.5px solid rgba(255,255,255,0.3)', borderRadius: '99px', padding: '3px 12px', fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>{chip}</span>
        ))}
      </div>

      {/* 이번 주 말씀 */}
      <div style={{ padding: '1.5rem', borderBottom: '0.5px solid #e0dbd0' }}>
        <div style={{ fontSize: '12px', letterSpacing: '0.18em', color: '#1e5c3e', fontWeight: 700, marginBottom: '1rem' }}>이번 주 말씀</div>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem 1.25rem 1.25rem 1.5rem', border: '0.5px solid #e0dbd0', borderLeft: '4px solid #1e5c3e' }}>
          <div style={{ fontSize: '15px', color: '#666', marginBottom: '5px' }}>{data.sermonSeries}</div>
          <div style={{ fontFamily: 'serif', fontSize: '21px', fontWeight: 700, lineHeight: 1.5, color: '#1a1a1a', marginBottom: '0.8rem' }}>{data.sermonTitle}</div>
          <div style={{ fontSize: '15px', color: '#1e5c3e', fontWeight: 500, padding: '0.6rem 0', borderTop: '0.5px solid #eee' }}>📖 {data.bibleVerse}</div>
          <div style={{ fontSize: '15px', lineHeight: 1.85, color: '#555', paddingTop: '0.75rem', borderTop: '0.5px solid #eee' }}>
            {data.sermonContent}
          </div>
        </div>
      </div>

      {/* 예배 순서 */}
      <div style={{ padding: '1.5rem', borderBottom: '0.5px solid #e0dbd0' }}>
        <div style={{ fontSize: '12px', letterSpacing: '0.18em', color: '#1e5c3e', fontWeight: 700, marginBottom: '1rem' }}>예배 순서</div>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1rem 1.25rem', border: '0.5px solid #e0dbd0' }}>
          {[
            { num: '1', title: '찬양과 경배' },
            { num: '2', title: '대표기도' },
            { num: '3', title: '설교말씀' },
            { num: '4', title: '봉헌' },
            { num: '5', title: '교회 소식' },
            { num: '6', title: '축도' },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '0.7rem 0', borderBottom: i < arr.length - 1 ? '0.5px solid #f0ede6' : 'none' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#1e5c3e', color: '#fff', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.num}</div>
              <div style={{ fontSize: '15px', color: '#333', fontWeight: 500 }}>{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 이번 주 광고 */}
      <div style={{ padding: '1.5rem', borderBottom: '0.5px solid #e0dbd0' }}>
        <div style={{ fontSize: '12px', letterSpacing: '0.18em', color: '#1e5c3e', fontWeight: 700, marginBottom: '1rem' }}>이번 주 광고</div>
        {data.announcements.map((item, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '0.9rem 1rem', border: '0.5px solid #e0dbd0', display: 'flex', gap: '12px', marginBottom: '10px' }}>
            <div style={{ textAlign: 'center', minWidth: '36px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#1e5c3e', lineHeight: 1 }}>{item.day}</div>
              <div style={{ fontSize: '12px', color: '#aaa', marginTop: '2px' }}>{item.dow}</div>
            </div>
            <div>
              <span style={{ display: 'inline-block', fontSize: '12px', padding: '2px 8px', borderRadius: '99px', background: '#e4f4ec', color: '#1e5c3e', fontWeight: 500, marginBottom: '5px' }}>{item.tag}</span>
              <div style={{ fontSize: '15px', lineHeight: 1.6, color: '#333' }}>{item.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 예배 안내 */}
      <div style={{ padding: '1.5rem', borderBottom: '0.5px solid #e0dbd0' }}>
        <div style={{ fontSize: '12px', letterSpacing: '0.18em', color: '#1e5c3e', fontWeight: 700, marginBottom: '1rem' }}>예배 안내</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '8px' }}>
          {[
            { name: '주일예배', time: '11:00' },
            { name: '주일오후예배', time: '14:00' },
            { name: '수요예배', time: '19:30' },
            { name: '금요예배', time: '19:30' },
            { name: '새벽예배', time: '05:30' },
            { name: '유초등부', time: '15:00' },
            { name: '학생부예배', time: '13:30' },
            { name: '청년부예배', time: '13:30' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '0.8rem 1rem', border: '0.5px solid #e0dbd0' }}>
              <div style={{ fontSize: '15px', color: '#666', marginBottom: '3px' }}>{item.name}</div>
              <div style={{ fontSize: '16px', fontWeight: 500, color: '#1a1a1a' }}>{item.time}</div>
            </div>
          ))}
        </div>

        {/* 위치 */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '0.9rem 1rem', border: '0.5px solid #e0dbd0', display: 'flex', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontSize: '19px' }}>📍</span>
          <div>
            <div style={{ fontSize: '15px', color: '#666', marginBottom: '2px' }}>위치</div>
            <div style={{ fontSize: '15px', fontWeight: 500, color: '#1a1a1a' }}>경기도 시흥시 신천동 두문로 54</div>
          </div>
        </div>

        {/* 연락처 */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '0.9rem 1rem', border: '0.5px solid #e0dbd0', display: 'flex', gap: '10px' }}>
          <span style={{ fontSize: '19px' }}>📞</span>
          <div>
            <div style={{ fontSize: '15px', color: '#666', marginBottom: '2px' }}>연락처</div>
            <div style={{ fontSize: '15px', fontWeight: 500, color: '#1a1a1a' }}>010-8336-6632</div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <div style={{ background: '#1e5c3e', padding: '1.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: 2 }}>
        <div style={{ color: '#fff', fontSize: '16px', display: 'block', marginBottom: '2px', fontWeight: 'bold' }}>큰기쁨의교회</div>
        대한예수교장로회 · 경기도 시흥시 신천동 두문로 54<br/>
        함께 누리는 큰 기쁨 🕊
      </div>

    </div>
  );
}