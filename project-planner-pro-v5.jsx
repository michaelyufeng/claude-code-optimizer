import React, { useState, useEffect } from 'react';

/**
 * Project Planner Pro v5 - AI驱动的全流程项目规划工具
 * 
 * 整合最佳实践:
 * - BMAD Method: 规模自适应智能 + 多专业代理架构
 * - GitHub Spec Kit: Spec驱动开发 (需求→规划→任务→实现)
 * - V-Bounce Model: AI原生SDLC，验证优先
 * - Agentsway: 多代理协作方法论
 * - Quality Gates: 自动化质量门禁
 * - 分阶段配置策略: 延迟优化，低成本迭代
 */

// ============ 常量定义 ============

const PROJECT_TRACKS = {
  quick: {
    id: 'quick',
    name: '⚡ 快速流程',
    description: 'Bug修复、小功能',
    phases: ['idea', 'spec', 'implement', 'output'],
    timeToStart: '< 5分钟',
    claudeConfig: 'minimal'
  },
  standard: {
    id: 'standard', 
    name: '📋 标准流程',
    description: '产品、平台、完整项目',
    phases: ['idea', 'research', 'planning', 'gate1', 'prototype', 'gate2', 'backend', 'integration', 'output'],
    timeToStart: '< 15分钟',
    claudeConfig: 'phased'
  },
  enterprise: {
    id: 'enterprise',
    name: '🏢 企业流程',
    description: '合规性、大规模系统',
    phases: ['idea', 'research', 'analysis', 'planning', 'gate1', 'architecture', 'prototype', 'gate2', 'backend', 'gate3', 'integration', 'deployment', 'output'],
    timeToStart: '< 30分钟',
    claudeConfig: 'full'
  }
};

const PHASES = {
  idea: { name: '💡 想法', icon: '💡', color: '#fbbf24', category: 'analysis' },
  research: { name: '🔍 研究', icon: '🔍', color: '#a78bfa', category: 'analysis' },
  analysis: { name: '📊 分析', icon: '📊', color: '#818cf8', category: 'analysis' },
  planning: { name: '📝 规划', icon: '📝', color: '#60a5fa', category: 'planning' },
  gate1: { name: '🚧 Gate 1', icon: '🚧', color: '#f97316', category: 'gate', isGate: true },
  architecture: { name: '🏗️ 架构', icon: '🏗️', color: '#14b8a6', category: 'solutioning' },
  prototype: { name: '🎨 原型', icon: '🎨', color: '#ec4899', category: 'implementation' },
  gate2: { name: '✅ Gate 2', icon: '✅', color: '#22c55e', category: 'gate', isGate: true },
  backend: { name: '⚙️ 后端', icon: '⚙️', color: '#6366f1', category: 'implementation' },
  gate3: { name: '🔒 Gate 3', icon: '🔒', color: '#ef4444', category: 'gate', isGate: true },
  integration: { name: '🔗 集成', icon: '🔗', color: '#8b5cf6', category: 'implementation' },
  deployment: { name: '🚀 部署', icon: '🚀', color: '#06b6d4', category: 'implementation' },
  spec: { name: '📋 规范', icon: '📋', color: '#3b82f6', category: 'planning' },
  implement: { name: '💻 实现', icon: '💻', color: '#10b981', category: 'implementation' },
  output: { name: '📦 输出', icon: '📦', color: '#10b981', category: 'output' }
};

const AI_AGENTS = {
  analyst: { name: '分析师', icon: '🔬', role: '需求分析、用户研究、市场调研', phase: ['research', 'analysis'] },
  pm: { name: '产品经理', icon: '📋', role: 'PRD编写、需求优先级、路线图', phase: ['planning'] },
  architect: { name: '架构师', icon: '🏗️', role: '系统设计、技术选型、API设计', phase: ['architecture', 'backend'] },
  uxDesigner: { name: 'UX设计师', icon: '🎨', role: '用户流程、界面设计、原型', phase: ['prototype'] },
  developer: { name: '开发者', icon: '💻', role: '代码实现、测试、优化', phase: ['prototype', 'backend', 'integration'] },
  reviewer: { name: '审核员', icon: '👁️', role: '质量门禁、代码审查、验收', phase: ['gate1', 'gate2', 'gate3'] },
  techWriter: { name: '技术文档', icon: '📝', role: 'API文档、用户指南、CLAUDE.md', phase: ['output'] },
  orchestrator: { name: '协调者', icon: '🎯', role: '流程协调、资源分配、进度跟踪', phase: ['all'] }
};

const MODEL_ALLOCATION = {
  haiku: { name: 'Haiku', cost: '$', tasks: ['简单查询', '格式转换', '日志分析', '基础代码生成'] },
  sonnet: { name: 'Sonnet', cost: '$$', tasks: ['复杂编码', 'API设计', '测试编写', '代码审查'] },
  opus: { name: 'Opus', cost: '$$$', tasks: ['架构决策', '复杂问题解决', '创意设计', '关键审核'] }
};

// ============ 主组件 ============

export default function ProjectPlannerPro() {
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, workflow, artifacts, agents
  const [selectedTrack, setSelectedTrack] = useState('standard');
  const [currentPhase, setCurrentPhase] = useState('idea');
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    idea: '',
    research: [],
    prd: null,
    techSpec: null,
    prototypeNotes: '',
    blackBoxFeatures: [],
    gateResults: {},
    outputs: {}
  });
  const [expandedSections, setExpandedSections] = useState({});

  const track = PROJECT_TRACKS[selectedTrack];
  const phaseIndex = track.phases.indexOf(currentPhase);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
      color: '#e2e8f0',
      padding: '24px'
    }}>
      {/* Header */}
      <header style={{
        marginBottom: '32px',
        borderBottom: '1px solid rgba(139, 92, 246, 0.3)',
        paddingBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              background: 'linear-gradient(90deg, #a78bfa, #ec4899, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px'
            }}>
              Project Planner Pro v5
            </h1>
            <p style={{ fontSize: '14px', color: '#94a3b8' }}>
              AI驱动的全流程项目规划 • Spec-Driven • Quality Gates • Multi-Agent
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['dashboard', 'workflow', 'artifacts', 'agents'].map(view => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: currentView === view ? '1px solid #8b5cf6' : '1px solid rgba(139, 92, 246, 0.3)',
                  background: currentView === view ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                  color: currentView === view ? '#a78bfa' : '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '13px',
                  textTransform: 'capitalize'
                }}
              >
                {view === 'dashboard' ? '📊 仪表板' : 
                 view === 'workflow' ? '🔄 工作流' : 
                 view === 'artifacts' ? '📄 产出物' : '🤖 代理'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      {currentView === 'dashboard' && (
        <DashboardView 
          track={track}
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
          currentPhase={currentPhase}
          setCurrentPhase={setCurrentPhase}
          projectData={projectData}
          setProjectData={setProjectData}
        />
      )}
      
      {currentView === 'workflow' && (
        <WorkflowView 
          track={track}
          currentPhase={currentPhase}
          setCurrentPhase={setCurrentPhase}
          projectData={projectData}
        />
      )}
      
      {currentView === 'artifacts' && (
        <ArtifactsView 
          track={track}
          currentPhase={currentPhase}
          projectData={projectData}
          setProjectData={setProjectData}
        />
      )}
      
      {currentView === 'agents' && (
        <AgentsView 
          currentPhase={currentPhase}
        />
      )}

      {/* Footer Stats */}
      <footer style={{
        marginTop: '32px',
        padding: '16px',
        background: 'rgba(30, 27, 75, 0.5)',
        borderRadius: '12px',
        border: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
          <span>📚 整合: BMAD Method • GitHub Spec Kit • V-Bounce Model • Agentsway</span>
          <span>🔬 研究来源: 25+ GitHub项目 • 10+ 学术论文 • Anthropic最佳实践</span>
        </div>
      </footer>
    </div>
  );
}

// ============ 仪表板视图 ============

function DashboardView({ track, selectedTrack, setSelectedTrack, currentPhase, setCurrentPhase, projectData, setProjectData }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
      {/* Left: Track Selection & Phase Navigation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Track Selector */}
        <div style={{
          background: 'rgba(30, 27, 75, 0.6)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#a78bfa' }}>
            🎯 选择项目轨道
          </h3>
          {Object.values(PROJECT_TRACKS).map(t => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTrack(t.id);
                setCurrentPhase(t.phases[0]);
              }}
              style={{
                width: '100%',
                padding: '14px',
                marginBottom: '10px',
                borderRadius: '10px',
                border: selectedTrack === t.id ? '2px solid #8b5cf6' : '1px solid rgba(139, 92, 246, 0.3)',
                background: selectedTrack === t.id ? 'rgba(139, 92, 246, 0.15)' : 'rgba(15, 23, 42, 0.5)',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#e2e8f0', marginBottom: '4px' }}>
                {t.name}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>{t.description}</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                ⏱️ {t.timeToStart} • 📊 {t.phases.length}阶段
              </div>
            </button>
          ))}
        </div>

        {/* Phase Progress */}
        <div style={{
          background: 'rgba(30, 27, 75, 0.6)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#a78bfa' }}>
            📍 阶段进度
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {track.phases.map((phaseId, idx) => {
              const phase = PHASES[phaseId];
              const isActive = phaseId === currentPhase;
              const isPast = idx < track.phases.indexOf(currentPhase);
              
              return (
                <button
                  key={phaseId}
                  onClick={() => setCurrentPhase(phaseId)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: isActive ? `${phase.color}22` : 'transparent',
                    cursor: 'pointer',
                    opacity: isPast ? 0.5 : 1
                  }}
                >
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: isActive ? phase.color : 'rgba(100, 116, 139, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px'
                  }}>
                    {isPast ? '✓' : phase.icon}
                  </span>
                  <span style={{
                    fontSize: '13px',
                    color: isActive ? '#e2e8f0' : '#94a3b8',
                    fontWeight: isActive ? '600' : '400'
                  }}>
                    {phase.name}
                  </span>
                  {phase.isGate && (
                    <span style={{
                      fontSize: '10px',
                      background: 'rgba(249, 115, 22, 0.2)',
                      color: '#f97316',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      marginLeft: 'auto'
                    }}>
                      审核点
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Phase Content */}
      <div style={{
        background: 'rgba(30, 27, 75, 0.6)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <PhaseContent 
          phase={currentPhase}
          track={track}
          projectData={projectData}
          setProjectData={setProjectData}
          setCurrentPhase={setCurrentPhase}
        />
      </div>
    </div>
  );
}

// ============ 阶段内容组件 ============

function PhaseContent({ phase, track, projectData, setProjectData, setCurrentPhase }) {
  const phaseInfo = PHASES[phase];
  const phaseIndex = track.phases.indexOf(phase);
  const nextPhase = track.phases[phaseIndex + 1];
  const prevPhase = track.phases[phaseIndex - 1];

  const renderPhaseSpecificContent = () => {
    switch (phase) {
      case 'idea':
        return <IdeaPhase projectData={projectData} setProjectData={setProjectData} />;
      case 'research':
        return <ResearchPhase projectData={projectData} setProjectData={setProjectData} />;
      case 'planning':
        return <PlanningPhase projectData={projectData} setProjectData={setProjectData} />;
      case 'gate1':
        return <GatePhase gateNumber={1} projectData={projectData} setProjectData={setProjectData} setCurrentPhase={setCurrentPhase} nextPhase={nextPhase} />;
      case 'prototype':
        return <PrototypePhase projectData={projectData} setProjectData={setProjectData} />;
      case 'gate2':
        return <GatePhase gateNumber={2} projectData={projectData} setProjectData={setProjectData} setCurrentPhase={setCurrentPhase} nextPhase={nextPhase} />;
      case 'backend':
        return <BackendPhase projectData={projectData} setProjectData={setProjectData} />;
      case 'output':
        return <OutputPhase projectData={projectData} track={track} />;
      default:
        return <DefaultPhaseContent phase={phase} />;
    }
  };

  return (
    <div>
      {/* Phase Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <span style={{
          fontSize: '32px',
          width: '50px',
          height: '50px',
          background: `${phaseInfo.color}22`,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {phaseInfo.icon}
        </span>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#e2e8f0' }}>
            {phaseInfo.name}
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>
            {getPhaseDescription(phase)}
          </p>
        </div>
      </div>

      {/* Phase Content */}
      {renderPhaseSpecificContent()}

      {/* Navigation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginTop: '24px',
        paddingTop: '16px',
        borderTop: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        {prevPhase && (
          <button
            onClick={() => setCurrentPhase(prevPhase)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              background: 'transparent',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            ← {PHASES[prevPhase].name}
          </button>
        )}
        <div style={{ flex: 1 }} />
        {nextPhase && !phaseInfo.isGate && (
          <button
            onClick={() => setCurrentPhase(nextPhase)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            {PHASES[nextPhase].name} →
          </button>
        )}
      </div>
    </div>
  );
}

// ============ 各阶段具体内容 ============

function IdeaPhase({ projectData, setProjectData }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '14px', color: '#a78bfa', marginBottom: '8px' }}>
          项目名称
        </label>
        <input
          type="text"
          value={projectData.name}
          onChange={(e) => setProjectData({...projectData, name: e.target.value})}
          placeholder="例: AI智能客服系统"
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            background: 'rgba(15, 23, 42, 0.5)',
            color: '#e2e8f0',
            fontSize: '14px'
          }}
        />
      </div>
      
      <div>
        <label style={{ display: 'block', fontSize: '14px', color: '#a78bfa', marginBottom: '8px' }}>
          核心想法 (一句话描述)
        </label>
        <textarea
          value={projectData.idea}
          onChange={(e) => setProjectData({...projectData, idea: e.target.value})}
          placeholder="用一句话描述你的产品想法..."
          rows={3}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            background: 'rgba(15, 23, 42, 0.5)',
            color: '#e2e8f0',
            fontSize: '14px',
            resize: 'vertical'
          }}
        />
      </div>

      <div style={{
        background: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '12px',
        padding: '16px'
      }}>
        <h4 style={{ color: '#22c55e', fontSize: '14px', marginBottom: '10px' }}>
          💡 Spec-Driven 提示
        </h4>
        <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
          在 AI 开发时代，想法阶段的清晰度决定了最终产品质量。
          一个好的想法应该能回答：<br/>
          • <strong>为谁解决</strong>什么问题？<br/>
          • <strong>如何衡量</strong>成功？<br/>
          • <strong>与现有方案</strong>有何不同？
        </p>
      </div>
    </div>
  );
}

function ResearchPhase({ projectData, setProjectData }) {
  const researchAreas = [
    { id: 'market', name: '市场研究', icon: '📊', questions: ['目标用户是谁？', '市场规模多大？', '竞争对手有哪些？'] },
    { id: 'tech', name: '技术研究', icon: '🔧', questions: ['需要哪些技术栈？', '有哪些现成方案？', '技术难点在哪？'] },
    { id: 'ux', name: '用户研究', icon: '👥', questions: ['用户痛点是什么？', '现有解决方案的不足？', '用户期望什么？'] }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {researchAreas.map(area => (
        <div key={area.id} style={{
          background: 'rgba(15, 23, 42, 0.5)',
          borderRadius: '12px',
          padding: '16px',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <h4 style={{ fontSize: '15px', color: '#e2e8f0', marginBottom: '12px' }}>
            {area.icon} {area.name}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {area.questions.map((q, i) => (
              <div key={i} style={{ 
                fontSize: '13px', 
                color: '#94a3b8',
                padding: '8px 12px',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '6px'
              }}>
                ❓ {q}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{
        background: 'rgba(167, 139, 250, 0.1)',
        border: '1px solid rgba(167, 139, 250, 0.3)',
        borderRadius: '12px',
        padding: '16px'
      }}>
        <h4 style={{ color: '#a78bfa', fontSize: '14px', marginBottom: '10px' }}>
          🤖 AI Agent: 分析师
        </h4>
        <p style={{ fontSize: '13px', color: '#94a3b8' }}>
          分析师代理可帮助进行市场调研、竞品分析和用户画像构建。
          使用 web search 工具获取最新数据。
        </p>
      </div>
    </div>
  );
}

function PlanningPhase({ projectData, setProjectData }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* PRD 生成 */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.5)',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <h4 style={{ fontSize: '16px', color: '#e2e8f0', marginBottom: '16px' }}>
          📄 产品需求文档 (PRD)
        </h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            { id: 'overview', name: '产品概述', status: 'pending' },
            { id: 'userStories', name: '用户故事', status: 'pending' },
            { id: 'requirements', name: '功能需求', status: 'pending' },
            { id: 'metrics', name: '成功指标', status: 'pending' },
            { id: 'constraints', name: '约束条件', status: 'pending' },
            { id: 'timeline', name: '时间规划', status: 'pending' }
          ].map(section => (
            <div key={section.id} style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '13px', color: '#e2e8f0' }}>{section.name}</span>
              <span style={{ 
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(251, 191, 36, 0.2)',
                color: '#fbbf24'
              }}>
                待完成
              </span>
            </div>
          ))}
        </div>

        <button style={{
          marginTop: '16px',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
          color: 'white',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          width: '100%'
        }}>
          🤖 使用 PM Agent 生成 PRD
        </button>
      </div>

      {/* 技术规范 */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.5)',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <h4 style={{ fontSize: '16px', color: '#e2e8f0', marginBottom: '16px' }}>
          ⚙️ 技术规范
        </h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { name: '技术栈选择', desc: 'Next.js, TypeScript, Prisma...' },
            { name: 'API 列表', desc: '定义所有API端点和数据结构' },
            { name: '数据模型', desc: '数据库表结构设计' },
            { name: '第三方集成', desc: '支付、认证、通知等' }
          ].map((item, i) => (
            <div key={i} style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(20, 184, 166, 0.1)',
              border: '1px solid rgba(20, 184, 166, 0.2)'
            }}>
              <div style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '4px' }}>{item.name}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GatePhase({ gateNumber, projectData, setProjectData, setCurrentPhase, nextPhase }) {
  const gateConfig = {
    1: {
      title: '规划审核',
      description: '确认PRD和技术规范是否完整、可行',
      checks: [
        { id: 'prd', name: 'PRD 完整性', desc: '所有必要部分都已填写' },
        { id: 'tech', name: '技术可行性', desc: '技术方案可实现' },
        { id: 'scope', name: '范围清晰', desc: 'MVP范围明确定义' },
        { id: 'risk', name: '风险识别', desc: '主要风险已识别和规划' }
      ],
      passAction: '开始原型开发',
      failAction: '返回规划阶段'
    },
    2: {
      title: '原型确认',
      description: '用户体验前端原型，确认是否满意',
      checks: [
        { id: 'ux', name: '用户体验', desc: '界面直观易用' },
        { id: 'flow', name: '用户流程', desc: '核心流程顺畅' },
        { id: 'design', name: '视觉设计', desc: '设计风格满意' },
        { id: 'feature', name: '功能覆盖', desc: '核心功能都有展示' }
      ],
      passAction: '开始后端开发',
      failAction: '重做前端原型 (低成本)'
    },
    3: {
      title: '集成测试',
      description: '完整系统测试和质量审核',
      checks: [
        { id: 'integration', name: '集成测试', desc: '前后端正常集成' },
        { id: 'security', name: '安全审核', desc: '无明显安全漏洞' },
        { id: 'performance', name: '性能测试', desc: '响应时间满足要求' },
        { id: 'edge', name: '边界测试', desc: '异常情况处理正确' }
      ],
      passAction: '准备部署',
      failAction: '返回开发修复'
    }
  };

  const config = gateConfig[gateNumber];
  const [checkStatus, setCheckStatus] = useState({});

  const allPassed = config.checks.every(c => checkStatus[c.id] === 'pass');
  const hasFailed = config.checks.some(c => checkStatus[c.id] === 'fail');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{
        background: 'rgba(249, 115, 22, 0.1)',
        border: '1px solid rgba(249, 115, 22, 0.3)',
        borderRadius: '12px',
        padding: '16px'
      }}>
        <h4 style={{ color: '#f97316', fontSize: '16px', marginBottom: '8px' }}>
          🚧 Gate {gateNumber}: {config.title}
        </h4>
        <p style={{ fontSize: '13px', color: '#94a3b8' }}>
          {config.description}
        </p>
      </div>

      {/* Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {config.checks.map(check => (
          <div key={check.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            borderRadius: '10px',
            background: 'rgba(15, 23, 42, 0.5)',
            border: checkStatus[check.id] === 'pass' ? '1px solid rgba(34, 197, 94, 0.5)' :
                   checkStatus[check.id] === 'fail' ? '1px solid rgba(239, 68, 68, 0.5)' :
                   '1px solid rgba(139, 92, 246, 0.2)'
          }}>
            <div>
              <div style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '4px' }}>{check.name}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>{check.desc}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setCheckStatus({...checkStatus, [check.id]: 'pass'})}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  background: checkStatus[check.id] === 'pass' ? '#22c55e' : 'rgba(34, 197, 94, 0.2)',
                  color: checkStatus[check.id] === 'pass' ? 'white' : '#22c55e',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ✓ 通过
              </button>
              <button
                onClick={() => setCheckStatus({...checkStatus, [check.id]: 'fail'})}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  background: checkStatus[check.id] === 'fail' ? '#ef4444' : 'rgba(239, 68, 68, 0.2)',
                  color: checkStatus[check.id] === 'fail' ? 'white' : '#ef4444',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ✗ 不通过
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Gate Decision */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
        {allPassed && (
          <button
            onClick={() => nextPhase && setCurrentPhase(nextPhase)}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            ✓ {config.passAction}
          </button>
        )}
        {hasFailed && (
          <div style={{
            flex: 1,
            padding: '14px',
            borderRadius: '10px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ color: '#ef4444', fontSize: '14px', fontWeight: '600' }}>
              ⚠️ {config.failAction}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>
              请解决不通过的检查项
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PrototypePhase({ projectData, setProjectData }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 原型配置说明 */}
      <div style={{
        background: 'rgba(236, 72, 153, 0.1)',
        border: '1px solid rgba(236, 72, 153, 0.3)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h4 style={{ color: '#ec4899', fontSize: '16px', marginBottom: '12px' }}>
          🎨 原型阶段 CLAUDE.md
        </h4>
        <pre style={{
          background: 'rgba(15, 23, 42, 0.8)',
          padding: '16px',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#a78bfa',
          overflow: 'auto'
        }}>
{`# 原型阶段配置 (极简)

## 目标
- 只做前端，不写后端
- 所有数据用 Mock
- 快速迭代，不要过度设计

## 技术栈
- React/Next.js
- Tailwind CSS
- Mock 数据 (JSON)

## 规则
- 不要创建数据库
- 不要实现真实 API
- 假按钮/假提示即可
- 专注用户体验和流程`}
        </pre>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>
          💡 重做成本: <strong style={{ color: '#22c55e' }}>极低</strong> - 仅需重写前端代码
        </p>
      </div>

      {/* 黑盒功能管理 */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.5)',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <h4 style={{ fontSize: '16px', color: '#e2e8f0', marginBottom: '16px' }}>
          📦 黑盒功能 (后端阶段实现)
        </h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            { name: '支付处理', mock: "alert('支付功能开发中')" },
            { name: '数据分析', mock: '显示示例图表' },
            { name: '定时任务', mock: '状态显示"已调度"' },
            { name: '通知推送', mock: "toast('通知已发送')" },
            { name: '文件上传', mock: '模拟上传进度条' },
            { name: '第三方集成', mock: '显示"已连接"状态' }
          ].map((feature, i) => (
            <div key={i} style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
              <div style={{ fontSize: '13px', color: '#e2e8f0', marginBottom: '4px' }}>{feature.name}</div>
              <code style={{ fontSize: '11px', color: '#818cf8' }}>{feature.mock}</code>
            </div>
          ))}
        </div>
      </div>

      {/* 用户流程清单 */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.5)',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <h4 style={{ fontSize: '16px', color: '#e2e8f0', marginBottom: '16px' }}>
          🔄 用户流程清单
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            '用户注册/登录流程',
            '核心功能主流程',
            '设置/配置页面',
            '错误状态展示',
            '空状态设计'
          ].map((flow, i) => (
            <label key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.1)',
              cursor: 'pointer'
            }}>
              <input type="checkbox" style={{ accentColor: '#8b5cf6' }} />
              <span style={{ fontSize: '13px', color: '#e2e8f0' }}>{flow}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function BackendPhase({ projectData, setProjectData }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 详细配置说明 */}
      <div style={{
        background: 'rgba(99, 102, 241, 0.1)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h4 style={{ color: '#818cf8', fontSize: '16px', marginBottom: '12px' }}>
          ⚙️ 后端阶段 CLAUDE.md (详细配置)
        </h4>
        <pre style={{
          background: 'rgba(15, 23, 42, 0.8)',
          padding: '16px',
          borderRadius: '8px',
          fontSize: '11px',
          color: '#a78bfa',
          overflow: 'auto',
          maxHeight: '300px'
        }}>
{`# 后端开发阶段配置

## 架构设计
- 使用 Clean Architecture
- API-first 设计
- 微服务准备度

## 模型分配策略
### Haiku ($)
- 日志分析
- 简单CRUD
- 格式转换

### Sonnet ($$)
- API实现
- 测试编写
- 代码审查

### Opus ($$$)
- 架构决策
- 复杂业务逻辑
- 安全审计

## 缓存策略
- Redis: 会话/热数据
- CDN: 静态资源
- 本地缓存: 配置

## 上下文管理
- 使用 Document Sharding
- 大文件分片加载
- 90% Token 节省

## API 实现清单
${projectData.prd?.apiList?.map(api => `- [ ] ${api}`).join('\n') || '- [ ] 待定义'}

## 安全要求
- [ ] 输入验证
- [ ] SQL 注入防护
- [ ] XSS 防护
- [ ] 速率限制
- [ ] 认证/授权`}
        </pre>
      </div>

      {/* 模型分配可视化 */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.5)',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <h4 style={{ fontSize: '16px', color: '#e2e8f0', marginBottom: '16px' }}>
          🤖 模型分配策略
        </h4>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          {Object.entries(MODEL_ALLOCATION).map(([key, model]) => (
            <div key={key} style={{
              flex: 1,
              padding: '16px',
              borderRadius: '10px',
              background: key === 'haiku' ? 'rgba(34, 197, 94, 0.1)' :
                         key === 'sonnet' ? 'rgba(59, 130, 246, 0.1)' :
                         'rgba(168, 85, 247, 0.1)',
              border: `1px solid ${
                key === 'haiku' ? 'rgba(34, 197, 94, 0.3)' :
                key === 'sonnet' ? 'rgba(59, 130, 246, 0.3)' :
                'rgba(168, 85, 247, 0.3)'
              }`
            }}>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: '700',
                color: key === 'haiku' ? '#22c55e' :
                       key === 'sonnet' ? '#3b82f6' : '#a855f7',
                marginBottom: '8px'
              }}>
                {model.name} {model.cost}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {model.tasks.map((task, i) => (
                  <div key={i} style={{ fontSize: '11px', color: '#94a3b8' }}>
                    • {task}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OutputPhase({ projectData, track }) {
  const outputs = [
    { name: 'CLAUDE.md', desc: '项目配置文件', format: 'md' },
    { name: 'PRD.md', desc: '产品需求文档', format: 'md' },
    { name: 'TECH_SPEC.md', desc: '技术规范', format: 'md' },
    { name: 'API_SPEC.yaml', desc: 'API规范', format: 'yaml' },
    { name: 'TASKS.md', desc: '任务分解', format: 'md' },
    { name: 'ARCHITECTURE.md', desc: '架构设计', format: 'md' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{
        background: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h4 style={{ color: '#22c55e', fontSize: '16px', marginBottom: '8px' }}>
          🎉 规划完成！
        </h4>
        <p style={{ fontSize: '13px', color: '#94a3b8' }}>
          所有产出物已准备就绪。你可以将这些文件导入到 Claude Code 开始开发。
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {outputs.map((output, i) => (
          <div key={i} style={{
            padding: '16px',
            borderRadius: '10px',
            background: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '4px' }}>
                📄 {output.name}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>{output.desc}</div>
            </div>
            <button style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              background: 'transparent',
              color: '#a78bfa',
              cursor: 'pointer',
              fontSize: '12px'
            }}>
              下载
            </button>
          </div>
        ))}
      </div>

      <button style={{
        padding: '14px',
        borderRadius: '10px',
        border: 'none',
        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        color: 'white',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600'
      }}>
        📦 导出所有文件 (ZIP)
      </button>
    </div>
  );
}

function DefaultPhaseContent({ phase }) {
  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      color: '#94a3b8'
    }}>
      <p>📝 {PHASES[phase]?.name || phase} 阶段内容开发中...</p>
    </div>
  );
}

// ============ 工作流视图 ============

function WorkflowView({ track, currentPhase, setCurrentPhase, projectData }) {
  return (
    <div style={{
      background: 'rgba(30, 27, 75, 0.6)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(139, 92, 246, 0.2)'
    }}>
      <h3 style={{ fontSize: '18px', color: '#a78bfa', marginBottom: '24px' }}>
        🔄 {track.name} 工作流
      </h3>
      
      {/* Visual Workflow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '20px',
        background: 'rgba(15, 23, 42, 0.5)',
        borderRadius: '12px'
      }}>
        {track.phases.map((phaseId, idx) => {
          const phase = PHASES[phaseId];
          const isActive = phaseId === currentPhase;
          const isPast = idx < track.phases.indexOf(currentPhase);
          
          return (
            <React.Fragment key={phaseId}>
              <button
                onClick={() => setCurrentPhase(phaseId)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: isActive ? `2px solid ${phase.color}` : '1px solid rgba(139, 92, 246, 0.3)',
                  background: isActive ? `${phase.color}22` : 'rgba(15, 23, 42, 0.8)',
                  cursor: 'pointer',
                  opacity: isPast ? 0.5 : 1,
                  minWidth: '80px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{phase.icon}</div>
                <div style={{ 
                  fontSize: '11px', 
                  color: isActive ? '#e2e8f0' : '#94a3b8',
                  fontWeight: isActive ? '600' : '400'
                }}>
                  {phase.name.replace(/[^\u4e00-\u9fa5a-zA-Z\s]/g, '')}
                </div>
              </button>
              {idx < track.phases.length - 1 && (
                <span style={{ color: '#4b5563', fontSize: '20px' }}>→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Phase Categories */}
      <div style={{
        marginTop: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px'
      }}>
        {[
          { name: '分析', color: '#a78bfa', phases: ['idea', 'research', 'analysis'] },
          { name: '规划', color: '#60a5fa', phases: ['planning', 'spec'] },
          { name: '设计', color: '#14b8a6', phases: ['architecture', 'prototype'] },
          { name: '实现', color: '#10b981', phases: ['backend', 'integration', 'deployment'] }
        ].map(category => (
          <div key={category.name} style={{
            padding: '16px',
            borderRadius: '10px',
            background: `${category.color}11`,
            border: `1px solid ${category.color}33`
          }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: category.color,
              marginBottom: '8px'
            }}>
              {category.name}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
              {category.phases.filter(p => track.phases.includes(p)).map(p => PHASES[p]?.icon).join(' ')}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        borderRadius: '12px',
        background: 'rgba(251, 191, 36, 0.1)',
        border: '1px solid rgba(251, 191, 36, 0.3)'
      }}>
        <h4 style={{ color: '#fbbf24', fontSize: '14px', marginBottom: '8px' }}>
          💡 Spec-Driven Development 核心原则
        </h4>
        <ul style={{ fontSize: '13px', color: '#94a3b8', paddingLeft: '20px', margin: 0 }}>
          <li>Spec 是源代码的真相，不是代码</li>
          <li>Gate 审核点确保质量，防止问题累积</li>
          <li>原型先行，验证满意后再写后端</li>
          <li>模块化配置，按需加载减少Token消耗</li>
        </ul>
      </div>
    </div>
  );
}

// ============ 产出物视图 ============

function ArtifactsView({ track, currentPhase, projectData, setProjectData }) {
  const artifacts = [
    { 
      id: 'claude-md',
      name: 'CLAUDE.md', 
      phase: 'prototype',
      description: 'Claude Code 项目配置',
      template: `# 项目: ${projectData.name || '待定义'}

## 阶段: 原型开发

### 目标
- 只做前端，不写后端
- 所有数据用 Mock
- 快速迭代

### 规则
- 不创建数据库
- 不实现真实 API
- 专注用户体验`
    },
    {
      id: 'prd',
      name: 'PRD.md',
      phase: 'planning',
      description: '产品需求文档',
      template: `# ${projectData.name || '产品'} - 产品需求文档

## 1. 概述
${projectData.idea || '待填写'}

## 2. 目标用户
待定义

## 3. 用户故事
待定义

## 4. 功能需求
待定义

## 5. 成功指标
待定义`
    },
    {
      id: 'tech-spec',
      name: 'TECH_SPEC.md',
      phase: 'planning',
      description: '技术规范',
      template: `# 技术规范

## 技术栈
- 前端: Next.js + TypeScript
- 后端: Node.js
- 数据库: PostgreSQL
- 部署: Vercel

## API 设计
待定义

## 数据模型
待定义`
    },
    {
      id: 'tasks',
      name: 'TASKS.md',
      phase: 'planning',
      description: '任务分解',
      template: `# 任务清单

## Phase 1: 原型
- [ ] 搭建项目结构
- [ ] 创建 Mock 数据
- [ ] 实现核心页面
- [ ] 用户流程测试

## Phase 2: 后端
- [ ] API 实现
- [ ] 数据库设计
- [ ] 认证系统
- [ ] 集成测试`
    }
  ];

  const [selectedArtifact, setSelectedArtifact] = useState(artifacts[0]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px' }}>
      {/* Artifact List */}
      <div style={{
        background: 'rgba(30, 27, 75, 0.6)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <h3 style={{ fontSize: '16px', color: '#a78bfa', marginBottom: '16px' }}>
          📄 产出物列表
        </h3>
        {artifacts.map(artifact => (
          <button
            key={artifact.id}
            onClick={() => setSelectedArtifact(artifact)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '8px',
              borderRadius: '8px',
              border: selectedArtifact.id === artifact.id ? 
                '1px solid #8b5cf6' : '1px solid rgba(139, 92, 246, 0.2)',
              background: selectedArtifact.id === artifact.id ?
                'rgba(139, 92, 246, 0.15)' : 'rgba(15, 23, 42, 0.5)',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div style={{ fontSize: '13px', color: '#e2e8f0', marginBottom: '4px' }}>
              {artifact.name}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              {artifact.description}
            </div>
          </button>
        ))}
      </div>

      {/* Artifact Preview */}
      <div style={{
        background: 'rgba(30, 27, 75, 0.6)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h3 style={{ fontSize: '18px', color: '#e2e8f0' }}>
            {selectedArtifact.name}
          </h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              background: 'transparent',
              color: '#a78bfa',
              cursor: 'pointer',
              fontSize: '12px'
            }}>
              复制
            </button>
            <button style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: '#8b5cf6',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px'
            }}>
              下载
            </button>
          </div>
        </div>
        <pre style={{
          background: 'rgba(15, 23, 42, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          fontSize: '12px',
          color: '#a78bfa',
          overflow: 'auto',
          maxHeight: '500px',
          lineHeight: '1.6'
        }}>
          {selectedArtifact.template}
        </pre>
      </div>
    </div>
  );
}

// ============ 代理视图 ============

function AgentsView({ currentPhase }) {
  return (
    <div style={{
      background: 'rgba(30, 27, 75, 0.6)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(139, 92, 246, 0.2)'
    }}>
      <h3 style={{ fontSize: '18px', color: '#a78bfa', marginBottom: '24px' }}>
        🤖 AI 代理团队 (灵感来自 BMAD Method)
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {Object.entries(AI_AGENTS).map(([key, agent]) => {
          const isActiveForPhase = agent.phase.includes(currentPhase) || agent.phase.includes('all');
          
          return (
            <div key={key} style={{
              padding: '20px',
              borderRadius: '12px',
              background: isActiveForPhase ? 'rgba(139, 92, 246, 0.15)' : 'rgba(15, 23, 42, 0.5)',
              border: isActiveForPhase ? 
                '1px solid rgba(139, 92, 246, 0.5)' : 
                '1px solid rgba(139, 92, 246, 0.2)',
              opacity: isActiveForPhase ? 1 : 0.6
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{agent.icon}</div>
              <div style={{ 
                fontSize: '15px', 
                fontWeight: '600', 
                color: '#e2e8f0',
                marginBottom: '8px'
              }}>
                {agent.name}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.5' }}>
                {agent.role}
              </div>
              {isActiveForPhase && (
                <div style={{
                  marginTop: '12px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: 'rgba(34, 197, 94, 0.2)',
                  color: '#22c55e',
                  fontSize: '11px',
                  display: 'inline-block'
                }}>
                  当前阶段可用
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Agent Collaboration */}
      <div style={{
        marginTop: '24px',
        padding: '20px',
        borderRadius: '12px',
        background: 'rgba(167, 139, 250, 0.1)',
        border: '1px solid rgba(167, 139, 250, 0.3)'
      }}>
        <h4 style={{ color: '#a78bfa', fontSize: '14px', marginBottom: '12px' }}>
          🔗 多代理协作模式 (Agentsway)
        </h4>
        <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '8px' }}>
            <strong>协调者</strong> 负责任务分配和进度跟踪，确保各代理高效协作。
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>分析 → 规划 → 设计 → 实现</strong> 的流水线模式，每个阶段由专业代理负责。
          </p>
          <p>
            <strong>审核员</strong> 在每个 Gate 检查点进行质量把控，确保产出物符合标准。
          </p>
        </div>
      </div>
    </div>
  );
}

// ============ 辅助函数 ============

function getPhaseDescription(phase) {
  const descriptions = {
    idea: '记录你的产品想法，明确要解决的问题',
    research: '市场调研、用户研究、竞品分析',
    analysis: '深度需求分析和可行性评估',
    planning: '编写PRD和技术规范',
    gate1: '审核规划文档，确认可行性',
    architecture: '系统架构设计和技术方案',
    prototype: '前端原型开发 (Mock数据)',
    gate2: '用户体验确认，满意后进入后端',
    backend: '后端API和数据库实现',
    gate3: '集成测试和安全审核',
    integration: '前后端集成和系统测试',
    deployment: '部署上线和监控配置',
    spec: '编写详细规范文档',
    implement: '代码实现',
    output: '导出所有产出物'
  };
  return descriptions[phase] || '阶段进行中...';
}
