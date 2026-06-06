'use client';

import { useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const PASSWORD = '1234';

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

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState(defaultData);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleLogin = () => {
    if (pw === PASSWORD) {
      setLoggedIn(true);
      setError('');
    } else {
      setError('비밀번호가 틀렸습니다.');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'jubbo', 'current'), data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      alert('저장 실패! 다시 시도해주세요.');
    }
    setSaving(false);
  };

  const updateAnnouncement = (i: number, field: string, value: string) => {
    const updated = [...data.announcements];
    updated[i] = { ...updated[i], [field]: value };
    setData({ ...data, announcements: updated });
  };

  const addAnnouncement = () => {
    setData({
      ...data,
      announcements: [...data.announcements, { day: '', dow: '', tag: '', text: '' }],
    });
  };

  const removeAnnouncement = (i: number) => {
    const updated = data.announcements.filter((_, idx) => idx !== i);
    setData({ ...data, announcements: updated });
  };

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', background: '#f0ede6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Noto Sans KR', sans-serif" }}>
        <div style={{ background: '#fff', borderRadius: '20px', padding: '2rem', width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '12px', letterSpacing: '0.18em', color: '#1e5c3e', fontWeight: 700, marginBottom: '0.5rem' }}>관리자</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a', marginBottom: '1.5rem' }}>큰기쁨의교회 주보</div>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #e0dbd0', fontSize: '15px', color: '#1a1a1a', marginBottom: '0.5rem', boxSizing: 'border-box' }}
          />
          {error && <div style={{ fontSize: '13px', color: '#e53e3e', marginBottom: '0.5rem' }}>{error}</div>}
          <button
            onClick={handleLogin}
            style={{ width: '100%', padding: '0.9rem', background: '#1e5c3e', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', background: '#f0ede6', fontFamily: "'Noto Sans KR', sans-serif", paddingBottom: '2rem' }}>

      {/* 헤더 */}
      <div style={{ background: '#1e5c3e', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>주보 관리자</div>
        <button onClick={() => setLoggedIn(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '5px 12px', borderRadius: '99px', fontSize: '13px', cursor: 'pointer' }}>로그아웃</button>
      </div>

      <div style={{ padding: '1.5rem' }}>

        {/* 날짜 */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.2rem', marginBottom: '12px', border: '0.5px solid #e0dbd0' }}>
          <div style={{ fontSize: '12px', color: '#1e5c3e', fontWeight: 700, marginBottom: '0.6rem' }}>📅 날짜</div>
          <input value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })}
            style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #e0dbd0', fontSize: '15px', color: '#1a1a1a', boxSizing: 'border-box', color: '#1a1a1a' }} />
        </div>

        {/* 설교 제목 */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.2rem', marginBottom: '12px', border: '0.5px solid #e0dbd0' }}>
          <div style={{ fontSize: '12px', color: '#1e5c3e', fontWeight: 700, marginBottom: '0.6rem' }}>✝️ 설교 제목</div>
          <input value={data.sermonTitle} onChange={(e) => setData({ ...data, sermonTitle: e.target.value })}
            style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #e0dbd0', fontSize: '15px', color: '#1a1a1a', boxSizing: 'border-box', marginBottom: '8px' }} />
          <div style={{ fontSize: '12px', color: '#999', marginBottom: '0.4rem' }}>시리즈</div>
          <input value={data.sermonSeries} onChange={(e) => setData({ ...data, sermonSeries: e.target.value })}
            style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #e0dbd0', fontSize: '15px', color: '#1a1a1a', boxSizing: 'border-box', color: '#1a1a1a' }} />
        </div>

        {/* 성경 구절 */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.2rem', marginBottom: '12px', border: '0.5px solid #e0dbd0' }}>
          <div style={{ fontSize: '12px', color: '#1e5c3e', fontWeight: 700, marginBottom: '0.6rem' }}>📖 성경 구절</div>
          <input value={data.bibleVerse} onChange={(e) => setData({ ...data, bibleVerse: e.target.value })}
            style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #e0dbd0', fontSize: '15px', color: '#1a1a1a', boxSizing: 'border-box', color: '#1a1a1a' }} />
        </div>

        {/* 설교 본문 */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.2rem', marginBottom: '12px', border: '0.5px solid #e0dbd0' }}>
          <div style={{ fontSize: '12px', color: '#1e5c3e', fontWeight: 700, marginBottom: '0.6rem' }}>📝 설교 본문 내용</div>
          <textarea value={data.sermonContent} onChange={(e) => setData({ ...data, sermonContent: e.target.value })}
            rows={4}
            style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #e0dbd0', fontSize: '15px', color: '#1a1a1a', boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.7 }} />
        </div>

        {/* 광고 */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.2rem', marginBottom: '12px', border: '0.5px solid #e0dbd0' }}>
          <div style={{ fontSize: '12px', color: '#1e5c3e', fontWeight: 700, marginBottom: '0.8rem' }}>📢 이번 주 광고</div>
          {data.announcements.map((item, i) => (
            <div key={i} style={{ background: '#f9f7f4', borderRadius: '10px', padding: '0.8rem', marginBottom: '8px', border: '0.5px solid #e0dbd0' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                <input placeholder="일" value={item.day} onChange={(e) => updateAnnouncement(i, 'day', e.target.value)}
                  style={{ width: '50px', padding: '0.5rem', borderRadius: '6px', border: '1px solid #e0dbd0', fontSize: 'border: '1px solid #e0dbd0', fontSize: '14px', color: '#1a1a1a'15px', color: '#1a1a1a', textAlign: 'center' }} />
                <input placeholder="요일" value={item.dow} onChange={(e) => updateAnnouncement(i, 'dow', e.target.value)}
                  style={{ width: '50px', padding: '0.5rem', borderRadius: '6px', border: '1px solid #e0dbd0', fontSize: 'border: '1px solid #e0dbd0', fontSize: '14px', color: '#1a1a1a'15px', color: '#1a1a1a', textAlign: 'center' }} />
                <input placeholder="태그" value={item.tag} onChange={(e) => updateAnnouncement(i, 'tag', e.target.value)}
                  style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #e0dbd0', fontSize: 'border: '1px solid #e0dbd0', fontSize: '14px', color: '#1a1a1a'15px', color: '#1a1a1a', color: '#1a1a1a' }} />
                <button onClick={() => removeAnnouncement(i)}
                  style={{ background: '#fee2e2', border: 'none', color: '#e53e3e', borderRadius: '6px', padding: '0.5rem 0.7rem', cursor: 'pointer', fontSize: '14px', color: '#1a1a1a' }}>✕</button>
              </div>
              <input placeholder="광고 내용" value={item.text} onChange={(e) => updateAnnouncement(i, 'text', e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #e0dbd0', fontSize: 'border: '1px solid #e0dbd0', fontSize: '14px', color: '#1a1a1a'15px', color: '#1a1a1a', boxSizing: 'border-box' }} />
            </div>
          ))}
          <button onClick={addAnnouncement}
            style={{ width: '100%', padding: '0.7rem', background: '#e4f4ec', border: 'none', borderRadius: '8px', color: '#1e5c3e', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
            + 광고 추가
          </button>
        </div>

        {/* 저장 버튼 */}
        <button onClick={handleSave} disabled={saving}
          style={{ width: '100%', padding: '1rem', background: '#1e5c3e', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>
          {saving ? '저장 중...' : saved ? '✅ 저장됐어요!' : '저장하기'}
        </button>

      </div>
    </div>
  );
}