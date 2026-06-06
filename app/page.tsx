export default function Home() {
  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', background: '#f0ede6', minHeight: '100vh', fontFamily: "'Noto Sans KR', sans-serif" }}>

      {/* 헤더 이미지 */}
      <div style={{
        width: '100%',
        aspectRatio: '2/1',
        backgroundImage: 'url("/church.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
      }}>
      </div>

      {/* 날짜 바 */}
      <div style={{ background: '#1e5c3e', padding: '10px 20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['2026년 6월 8일', '주일예배', '오전 11:00'].map((chip) => (
          <span key={chip} style={{ background: 'rgba(255,255,255,0.15)', border: '0.5px solid rgba(255,255,255,0.3)', borderRadius: '99px', padding: '3px 12px', fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>{chip}</span>
        ))}
      </div>

      {/* 이번 주 말씀 */}
      <div style={{ padding: '1.5rem', borderBottom: '0.5px solid #e0dbd0' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#1e5c3e', fontWeight: 700, marginBottom: '1rem' }}>이번 주 말씀</div>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem 1.25rem 1.25rem 1.5rem', border: '0.5px solid #e0dbd0', borderLeft: '4px solid #1e5c3e' }}>
          <div style={{ fontSize: '11px', color: '#999', marginBottom: '5px' }}>시리즈 · 기쁨으로 사는 삶</div>
          <div style={{ fontFamily: 'serif', fontSize: '19px', fontWeight: 700, lineHeight: 1.5, color: '#1a1a1a', marginBottom: '0.8rem' }}>"두려워하지 말라,<br/>내가 너와 함께하노라"</div>
          <div style={{ fontSize: '13px', color: '#1e5c3e', fontWeight: 500, padding: '0.6rem 0', borderTop: '0.5px solid #eee' }}>📖 이사야 41장 10절</div>
          <div style={{ fontSize: '13px', lineHeight: 1.85, color: '#555', paddingTop: '0.75rem', borderTop: '0.5px solid #eee' }}>
            하나님은 우리가 홀로 광야를 걷는다고 느낄 때에도 손을 놓지 않으십니다. 두려움이 아닌 믿음으로, 오늘 이 자리에서 하나님의 동행을 새롭게 경험하세요.
          </div>
        </div>
      </div>

      {/* 이번 주 광고 */}
      <div style={{ padding: '1.5rem', borderBottom: '0.5px solid #e0dbd0' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#1e5c3e', fontWeight: 700, marginBottom: '1rem' }}>이번 주 광고</div>
        {[
          { day: '8', dow: '일', tag: '예배', text: '예배 후 새 가족 환영 모임이 있습니다.' },
          { day: '11', dow: '수', tag: '소그룹', text: '수요 소그룹 모임이 오후 7시 30분에 진행됩니다.' },
          { day: '15', dow: '일', tag: '특별', text: '다음 주일 찬양예배가 예정되어 있습니다.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '0.9rem 1rem', border: '0.5px solid #e0dbd0', display: 'flex', gap: '12px', marginBottom: '10px' }}>
            <div style={{ textAlign: 'center', minWidth: '36px' }}>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#1e5c3e', lineHeight: 1 }}>{item.day}</div>
              <div style={{ fontSize: '10px', color: '#aaa', marginTop: '2px' }}>{item.dow}</div>
            </div>
            <div>
              <span style={{ display: 'inline-block', fontSize: '10px', padding: '2px 8px', borderRadius: '99px', background: '#e4f4ec', color: '#1e5c3e', fontWeight: 500, marginBottom: '5px' }}>{item.tag}</span>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#333' }}>{item.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 예배 안내 */}
      <div style={{ padding: '1.5rem', borderBottom: '0.5px solid #e0dbd0' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#1e5c3e', fontWeight: 700, marginBottom: '1rem' }}>예배 안내</div>
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
              <div style={{ fontSize: '11px', color: '#999', marginBottom: '3px' }}>{item.name}</div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a1a' }}>{item.time}</div>
            </div>
          ))}
        </div>

        {/* 위치 */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '0.9rem 1rem', border: '0.5px solid #e0dbd0', display: 'flex', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontSize: '17px' }}>📍</span>
          <div>
            <div style={{ fontSize: '11px', color: '#999', marginBottom: '2px' }}>위치</div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a1a' }}>경기도 시흥시 신천동 두문로 54</div>
          </div>
        </div>

        {/* 연락처 */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '0.9rem 1rem', border: '0.5px solid #e0dbd0', display: 'flex', gap: '10px' }}>
          <span style={{ fontSize: '17px' }}>📞</span>
          <div>
            <div style={{ fontSize: '11px', color: '#999', marginBottom: '2px' }}>연락처</div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a1a' }}>010-8336-6632</div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <div style={{ background: '#1e5c3e', padding: '1.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '12px', lineHeight: 2 }}>
        <div style={{ color: '#fff', fontSize: '14px', display: 'block', marginBottom: '2px', fontWeight: 'bold' }}>큰기쁨의교회</div>
        대한예수교장로회 · 경기도 시흥시 신천동 두문로 54<br/>
        함께 누리는 큰 기쁨 🕊
      </div>

    </div>
  );
}