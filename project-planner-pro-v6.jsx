import React, { useState, useEffect, useCallback } from 'react';

/**
 * Project Planner Pro v6 - 完整可交互版本
 * 
 * 核心功能：
 * 1. 三种项目状态：全新/开发中/运维
 * 2. 增强研究模块：多类型搜索
 * 3. 任务进展追踪：完成度/错误记录
 * 4. 上下文感知任务分割：多Agent并行
 * 5. 分层CLAUDE.md：每个模块独立配置
 * 6. 强制顺序逻辑：不能跳步
 */

// ============ 常量定义 ============

const PROJECT_STATES = {
  new: {
    id: 'new',
    name: '🆕 全新项目',
    description: '项目还未启动，需要完整规划后才能开发',
    phases: ['research', 'planning', 'gate1', 'architecture', 'prototype', 'gate2', 'backend', 'integration', 'output'],
    restrictions: 'none',
    claudeConfig: 'full-planning'
  },
  developing: {
    id: 'developing',
    name: '🔧 开发中项目',
    description: '框架已定，部分功能完成，需要完善计划',
    phases: ['analyze', 'update-plan', 'gate1', 'continue-dev', 'gate2', 'output'],
    restrictions: 'preserve-structure',
    claudeConfig: 'incremental'
  },
  production: {
    id: 'production',
    name: '🚀 运维项目',
    description: '已上线运行，只做修复，严格红线保护',
    phases: ['diagnose', 'approve', 'fix', 'verify', 'output'],
    restrictions: 'strict-redlines',
    claudeConfig: 'minimal-change'
  }
};

const RESEARCH_TYPES = [
  { id: 'market', name: '市场调研', icon: '📊', sources: ['行业报告', '竞品分析', '市场趋势'] },
  { id: 'tech', name: '技术研究', icon: '⚙️', sources: ['GitHub项目', '技术文档', '开源方案'] },
  { id: 'user', name: '用户研究', icon: '👥', sources: ['用户访谈', '问卷调查', '行为数据'] },
  { id: 'legal', name: '合规研究', icon: '⚖️', sources: ['法规政策', '行业标准', '安全要求'] },
  { id: 'cost', name: '成本研究', icon: '💰', sources: ['人力成本', '服务器成本', 'API费用'] },
  { id: 'competitor', name: '竞品研究', icon: '🎯', sources: ['功能对比', '定价策略', '用户评价'] }
];

const SEARCH_TOOLS = [
  { id: 'web', name: 'Web搜索', icon: '🌐', desc: '通用网络搜索' },
  { id: 'github', name: 'GitHub', icon: '📦', desc: '开源项目/代码' },
  { id: 'arxiv', name: 'arXiv', icon: '📄', desc: '学术论文' },
  { id: 'stackoverflow', name: 'StackOverflow', icon: '💬', desc: '技术问答' },
  { id: 'npm', name: 'NPM/PyPI', icon: '📚', desc: '包管理器' },
  { id: 'docs', name: '官方文档', icon: '📖', desc: 'API文档' }
];

// 上下文Token估算
const CONTEXT_LIMITS = {
  small: { tokens: 8000, name: '小型任务', duration: '5-10分钟' },
  medium: { tokens: 32000, name: '中型任务', duration: '15-30分钟' },
  large: { tokens: 100000, name: '大型任务', duration: '30-60分钟' },
  max: { tokens: 200000, name: '最大上下文', duration: '60分钟+' }
};

// ============ 主组件 ============

export default function ProjectPlannerV6() {
  // 核心状态
  const [projectState, setProjectState] = useState(null); // 项目状态选择
  const [currentStep, setCurrentStep] = useState(0); // 当前步骤（强制顺序）
  const [stepCompleted, setStepCompleted] = useState({}); // 步骤完成状态
  
  // 项目数据
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    codebaseUrl: '',
    existingFiles: [],
    research: {},
    tasks: [],
    errors: [],
    progress: {},
    claudeMdFiles: {},
    agents: []
  });

  // UI状态
  const [activeTab, setActiveTab] = useState('main');
  const [showTaskSplitter, setShowTaskSplitter] = useState(false);

  // 强制顺序逻辑：只有完成当前步骤才能进入下一步
  const canProceed = (stepIndex) => {
    if (stepIndex === 0) return true;
    return stepCompleted[stepIndex - 1] === true;
  };

  const completeStep = (stepIndex) => {
    setStepCompleted(prev => ({ ...prev, [stepIndex]: true }));
  };

  // 如果未选择项目状态，显示选择界面
  if (!projectState) {
    return <ProjectStateSelector onSelect={setProjectState} />;
  }

  const stateConfig = PROJECT_STATES[projectState];
  const phases = stateConfig.phases;
  const currentPhase = phases[currentStep];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      color: '#e0e0e0',
      padding: '20px'
    }}>
      {/* 顶部导航 */}
      <Header 
        projectState={stateConfig}
        currentStep={currentStep}
        totalSteps={phases.length}
        projectData={projectData}
        onReset={() => {
          setProjectState(null);
          setCurrentStep(0);
          setStepCompleted({});
        }}
      />

      {/* 进度条 - 显示强制顺序 */}
      <ProgressBar 
        phases={phases}
        currentStep={currentStep}
        stepCompleted={stepCompleted}
        canProceed={canProceed}
        onStepClick={(idx) => {
          if (canProceed(idx) && idx <= currentStep) {
            setCurrentStep(idx);
          }
        }}
      />

      {/* 主内容区 */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 300px', gap: '20px', marginTop: '20px' }}>
        {/* 左侧：任务进展追踪 */}
        <TaskProgressPanel 
          tasks={projectData.tasks}
          errors={projectData.errors}
          progress={projectData.progress}
          onUpdateTask={(taskId, updates) => {
            setProjectData(prev => ({
              ...prev,
              tasks: prev.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
            }));
          }}
          onAddError={(error) => {
            setProjectData(prev => ({
              ...prev,
              errors: [...prev.errors, { ...error, id: Date.now(), timestamp: new Date().toISOString() }]
            }));
          }}
        />

        {/* 中间：主要工作区 */}
        <MainWorkArea 
          projectState={projectState}
          currentPhase={currentPhase}
          projectData={projectData}
          setProjectData={setProjectData}
          onComplete={() => {
            completeStep(currentStep);
            if (currentStep < phases.length - 1) {
              setCurrentStep(currentStep + 1);
            }
          }}
          canProceed={canProceed(currentStep)}
          stepCompleted={stepCompleted[currentStep]}
        />

        {/* 右侧：Agent管理 & CLAUDE.md */}
        <RightPanel 
          projectData={projectData}
          setProjectData={setProjectData}
          showTaskSplitter={showTaskSplitter}
          setShowTaskSplitter={setShowTaskSplitter}
        />
      </div>

      {/* 任务分割器弹窗 */}
      {showTaskSplitter && (
        <TaskSplitterModal 
          projectData={projectData}
          setProjectData={setProjectData}
          onClose={() => setShowTaskSplitter(false)}
        />
      )}
    </div>
  );
}

// ============ 项目状态选择器 ============

function ProjectStateSelector({ onSelect }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'JetBrains Mono', monospace",
      padding: '20px'
    }}>
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            background: 'linear-gradient(90deg, #00d4ff, #7c3aed, #f472b6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '12px'
          }}>
            Project Planner Pro v6
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            选择你的项目状态，开始精准规划
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {Object.values(PROJECT_STATES).map(state => (
            <button
              key={state.id}
              onClick={() => onSelect(state.id)}
              style={{
                padding: '30px 24px',
                borderRadius: '16px',
                border: '2px solid transparent',
                background: 'linear-gradient(145deg, rgba(30,30,50,0.8), rgba(20,20,35,0.9))',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#7c3aed';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>
                {state.name.split(' ')[0]}
              </div>
              <div style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#e0e0e0',
                marginBottom: '8px'
              }}>
                {state.name.split(' ').slice(1).join(' ')}
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' }}>
                {state.description}
              </div>
              <div style={{
                marginTop: '16px',
                padding: '8px 12px',
                borderRadius: '8px',
                background: 'rgba(124, 58, 237, 0.1)',
                fontSize: '12px',
                color: '#a78bfa'
              }}>
                {state.phases.length} 个步骤 • {state.restrictions === 'strict-redlines' ? '🔴 严格红线' : 
                  state.restrictions === 'preserve-structure' ? '🟡 保持结构' : '🟢 完整规划'}
              </div>
            </button>
          ))}
        </div>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          borderRadius: '12px',
          background: 'rgba(251, 191, 36, 0.1)',
          border: '1px solid rgba(251, 191, 36, 0.3)'
        }}>
          <h4 style={{ color: '#fbbf24', fontSize: '14px', marginBottom: '10px' }}>
            💡 如何选择？
          </h4>
          <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
            <strong>全新项目</strong>：从零开始，需要完整的PRD、技术规范、架构设计<br/>
            <strong>开发中项目</strong>：已有代码框架，需要分析现状并继续开发<br/>
            <strong>运维项目</strong>：线上运行中，只做bug修复，严禁大改动
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ 头部组件 ============

function Header({ projectState, currentStep, totalSteps, projectData, onReset }) {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      background: 'rgba(20, 20, 35, 0.8)',
      borderRadius: '12px',
      border: '1px solid rgba(124, 58, 237, 0.2)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: '700',
          background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Project Planner Pro v6
        </h1>
        <span style={{
          padding: '4px 12px',
          borderRadius: '20px',
          background: projectState.id === 'production' ? 'rgba(239, 68, 68, 0.2)' :
                     projectState.id === 'developing' ? 'rgba(251, 191, 36, 0.2)' :
                     'rgba(34, 197, 94, 0.2)',
          color: projectState.id === 'production' ? '#ef4444' :
                 projectState.id === 'developing' ? '#fbbf24' : '#22c55e',
          fontSize: '12px'
        }}>
          {projectState.name}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>进度</div>
          <div style={{ fontSize: '16px', color: '#e0e0e0', fontWeight: '600' }}>
            {currentStep + 1} / {totalSteps}
          </div>
        </div>
        <button
          onClick={onReset}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            background: 'transparent',
            color: '#ef4444',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          重置项目
        </button>
      </div>
    </header>
  );
}

// ============ 进度条组件 ============

function ProgressBar({ phases, currentStep, stepCompleted, canProceed, onStepClick }) {
  const phaseNames = {
    research: '🔍 研究',
    planning: '📝 规划',
    gate1: '🚧 审核1',
    architecture: '🏗️ 架构',
    prototype: '🎨 原型',
    gate2: '✅ 审核2',
    backend: '⚙️ 后端',
    integration: '🔗 集成',
    output: '📦 输出',
    analyze: '🔬 分析',
    'update-plan': '📋 更新计划',
    'continue-dev': '💻 继续开发',
    diagnose: '🔎 诊断',
    approve: '👆 审批',
    fix: '🔧 修复',
    verify: '✔️ 验证'
  };

  return (
    <div style={{
      marginTop: '20px',
      padding: '16px 24px',
      background: 'rgba(20, 20, 35, 0.6)',
      borderRadius: '12px',
      border: '1px solid rgba(124, 58, 237, 0.2)',
      overflowX: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 'max-content' }}>
        {phases.map((phase, idx) => {
          const isCompleted = stepCompleted[idx];
          const isCurrent = idx === currentStep;
          const isLocked = !canProceed(idx);
          
          return (
            <React.Fragment key={phase}>
              <button
                onClick={() => onStepClick(idx)}
                disabled={isLocked && idx > currentStep}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: isCurrent ? '2px solid #7c3aed' : '1px solid rgba(100, 100, 120, 0.3)',
                  background: isCompleted ? 'rgba(34, 197, 94, 0.2)' :
                             isCurrent ? 'rgba(124, 58, 237, 0.2)' :
                             'rgba(30, 30, 50, 0.5)',
                  color: isCompleted ? '#22c55e' :
                         isCurrent ? '#a78bfa' :
                         isLocked ? '#4b5563' : '#94a3b8',
                  cursor: isLocked && idx > currentStep ? 'not-allowed' : 'pointer',
                  fontSize: '12px',
                  fontWeight: isCurrent ? '600' : '400',
                  opacity: isLocked && idx > currentStep ? 0.5 : 1,
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isCompleted && <span>✓</span>}
                {isLocked && idx > currentStep && <span>🔒</span>}
                {phaseNames[phase] || phase}
              </button>
              {idx < phases.length - 1 && (
                <span style={{ 
                  color: isCompleted ? '#22c55e' : '#4b5563',
                  fontSize: '16px'
                }}>→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* 强制顺序提示 */}
      <div style={{
        marginTop: '12px',
        fontSize: '11px',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span>🔐</span>
        <span>强制顺序模式：必须完成当前步骤才能进入下一步</span>
      </div>
    </div>
  );
}

// ============ 任务进展面板 ============

function TaskProgressPanel({ tasks, errors, progress, onUpdateTask, onAddError }) {
  const [newErrorText, setNewErrorText] = useState('');
  const [showAddError, setShowAddError] = useState(false);

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div style={{
      background: 'rgba(20, 20, 35, 0.8)',
      borderRadius: '12px',
      border: '1px solid rgba(124, 58, 237, 0.2)',
      overflow: 'hidden'
    }}>
      {/* 进度统计 */}
      <div style={{ padding: '16px', borderBottom: '1px solid rgba(100, 100, 120, 0.2)' }}>
        <h3 style={{ fontSize: '14px', color: '#a78bfa', marginBottom: '12px' }}>
          📊 任务进展
        </h3>
        
        {/* 进度条 */}
        <div style={{
          height: '8px',
          background: 'rgba(100, 100, 120, 0.2)',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '8px'
        }}>
          <div style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #22c55e, #10b981)',
            borderRadius: '4px',
            transition: 'width 0.3s ease'
          }} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
          <span>{completedTasks}/{totalTasks} 完成</span>
          <span>{progressPercent}%</span>
        </div>
      </div>

      {/* 任务列表 */}
      <div style={{ padding: '12px', maxHeight: '200px', overflowY: 'auto' }}>
        <h4 style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>任务列表</h4>
        {tasks.length === 0 ? (
          <div style={{ fontSize: '12px', color: '#4b5563', textAlign: 'center', padding: '20px' }}>
            暂无任务
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px',
              borderRadius: '6px',
              background: 'rgba(30, 30, 50, 0.5)',
              marginBottom: '6px'
            }}>
              <input
                type="checkbox"
                checked={task.status === 'completed'}
                onChange={(e) => onUpdateTask(task.id, { 
                  status: e.target.checked ? 'completed' : 'pending' 
                })}
                style={{ accentColor: '#7c3aed' }}
              />
              <span style={{
                fontSize: '12px',
                color: task.status === 'completed' ? '#22c55e' : '#e0e0e0',
                textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                flex: 1
              }}>
                {task.name}
              </span>
              <span style={{
                fontSize: '10px',
                padding: '2px 6px',
                borderRadius: '4px',
                background: task.contextSize === 'small' ? 'rgba(34, 197, 94, 0.2)' :
                           task.contextSize === 'medium' ? 'rgba(251, 191, 36, 0.2)' :
                           'rgba(239, 68, 68, 0.2)',
                color: task.contextSize === 'small' ? '#22c55e' :
                       task.contextSize === 'medium' ? '#fbbf24' : '#ef4444'
              }}>
                {task.contextSize || 'S'}
              </span>
            </div>
          ))
        )}
      </div>

      {/* 错误记录 */}
      <div style={{ padding: '12px', borderTop: '1px solid rgba(100, 100, 120, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h4 style={{ fontSize: '12px', color: '#ef4444' }}>⚠️ 错误记录 ({errors.length})</h4>
          <button
            onClick={() => setShowAddError(!showAddError)}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: 'none',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              cursor: 'pointer',
              fontSize: '10px'
            }}
          >
            + 记录错误
          </button>
        </div>
        
        {showAddError && (
          <div style={{ marginBottom: '8px' }}>
            <input
              type="text"
              value={newErrorText}
              onChange={(e) => setNewErrorText(e.target.value)}
              placeholder="描述错误..."
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                background: 'rgba(15, 15, 25, 0.8)',
                color: '#e0e0e0',
                fontSize: '12px',
                marginBottom: '6px'
              }}
            />
            <button
              onClick={() => {
                if (newErrorText.trim()) {
                  onAddError({ text: newErrorText, resolved: false });
                  setNewErrorText('');
                  setShowAddError(false);
                }
              }}
              style={{
                width: '100%',
                padding: '6px',
                borderRadius: '4px',
                border: 'none',
                background: '#ef4444',
                color: 'white',
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              保存
            </button>
          </div>
        )}
        
        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {errors.map(error => (
            <div key={error.id} style={{
              fontSize: '11px',
              padding: '6px 8px',
              borderRadius: '4px',
              background: error.resolved ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: error.resolved ? '#22c55e' : '#fca5a5',
              marginBottom: '4px'
            }}>
              {error.resolved ? '✓ ' : '• '}{error.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ 主工作区 ============

function MainWorkArea({ projectState, currentPhase, projectData, setProjectData, onComplete, canProceed, stepCompleted }) {
  // 根据当前阶段渲染不同内容
  const renderPhaseContent = () => {
    switch (currentPhase) {
      case 'research':
        return <ResearchPhase projectData={projectData} setProjectData={setProjectData} />;
      case 'planning':
        return <PlanningPhase projectData={projectData} setProjectData={setProjectData} />;
      case 'gate1':
      case 'gate2':
        return <GatePhase gateName={currentPhase} projectState={projectState} projectData={projectData} />;
      case 'architecture':
        return <ArchitecturePhase projectData={projectData} setProjectData={setProjectData} />;
      case 'prototype':
        return <PrototypePhase projectData={projectData} setProjectData={setProjectData} />;
      case 'backend':
        return <BackendPhase projectData={projectData} setProjectData={setProjectData} />;
      case 'analyze':
        return <AnalyzePhase projectData={projectData} setProjectData={setProjectData} />;
      case 'diagnose':
        return <DiagnosePhase projectData={projectData} setProjectData={setProjectData} />;
      case 'approve':
        return <ApprovePhase projectData={projectData} setProjectData={setProjectData} />;
      case 'fix':
        return <FixPhase projectData={projectData} setProjectData={setProjectData} />;
      case 'output':
        return <OutputPhase projectData={projectData} projectState={projectState} />;
      default:
        return <DefaultPhase phaseName={currentPhase} />;
    }
  };

  return (
    <div style={{
      background: 'rgba(20, 20, 35, 0.8)',
      borderRadius: '12px',
      border: '1px solid rgba(124, 58, 237, 0.2)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 阶段内容 */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {renderPhaseContent()}
      </div>

      {/* 完成按钮 */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid rgba(100, 100, 120, 0.2)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <button
          onClick={onComplete}
          disabled={stepCompleted}
          style={{
            padding: '12px 32px',
            borderRadius: '8px',
            border: 'none',
            background: stepCompleted ? 'rgba(34, 197, 94, 0.3)' : 'linear-gradient(135deg, #7c3aed, #a78bfa)',
            color: 'white',
            cursor: stepCompleted ? 'default' : 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {stepCompleted ? '✓ 已完成' : '完成此步骤 →'}
        </button>
      </div>
    </div>
  );
}

// ============ 研究阶段（完整增强版） ============

function ResearchPhase({ projectData, setProjectData }) {
  const [activeResearch, setActiveResearch] = useState('market');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [researchNotes, setResearchNotes] = useState({});
  const [savedResults, setSavedResults] = useState([]);
  const [searchConfig, setSearchConfig] = useState({
    depth: 'standard',
    language: 'all',
    timeRange: 'all',
    resultCount: 10
  });
  const [isSearching, setIsSearching] = useState(false);
  const [activeTools, setActiveTools] = useState([]);

  // 研究完成度计算
  const researchProgress = RESEARCH_TYPES.reduce((acc, type) => {
    const hasNotes = researchNotes[type.id]?.length > 50;
    const hasResults = savedResults.filter(r => r.category === type.id).length > 0;
    acc[type.id] = { hasNotes, hasResults, complete: hasNotes && hasResults };
    return acc;
  }, {});

  const overallProgress = Object.values(researchProgress).filter(p => p.complete).length;

  const handleSearch = (toolId) => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setActiveTools(prev => [...prev, toolId]);
    
    // 模拟异步搜索
    setTimeout(() => {
      const newResults = [
        { 
          id: Date.now(), 
          title: `【${toolId.toUpperCase()}】${searchQuery} - 相关结果 1`,
          source: toolId,
          url: `https://${toolId}.example.com/result1`,
          snippet: '这是搜索结果的摘要内容...',
          relevance: 'high',
          saved: false
        },
        { 
          id: Date.now() + 1, 
          title: `【${toolId.toUpperCase()}】${searchQuery} - 相关结果 2`,
          source: toolId,
          url: `https://${toolId}.example.com/result2`,
          snippet: '另一个相关的搜索结果摘要...',
          relevance: 'medium',
          saved: false
        },
        { 
          id: Date.now() + 2, 
          title: `【${toolId.toUpperCase()}】${searchQuery} - 相关结果 3`,
          source: toolId,
          url: `https://${toolId}.example.com/result3`,
          snippet: '第三个搜索结果的描述内容...',
          relevance: 'low',
          saved: false
        }
      ];
      
      setSearchResults(prev => [...newResults, ...prev].slice(0, 20));
      setIsSearching(false);
      setActiveTools(prev => prev.filter(t => t !== toolId));
    }, 800);
  };

  const handleBatchSearch = () => {
    SEARCH_TOOLS.forEach((tool, index) => {
      setTimeout(() => handleSearch(tool.id), index * 500);
    });
  };

  const saveResult = (result) => {
    setSavedResults(prev => [...prev, { ...result, category: activeResearch, savedAt: new Date().toISOString() }]);
    setSearchResults(prev => prev.map(r => r.id === result.id ? { ...r, saved: true } : r));
  };

  const exportResearch = () => {
    const exportData = {
      notes: researchNotes,
      savedResults,
      exportedAt: new Date().toISOString()
    };
    console.log('导出研究数据:', exportData);
    alert('研究数据已导出到控制台（实际使用时会下载文件）');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', color: '#e0e0e0' }}>
          🔍 研究阶段 - 多维度信息收集
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
            完成度: {overallProgress}/{RESEARCH_TYPES.length}
          </span>
          <button
            onClick={exportResearch}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: 'rgba(34, 197, 94, 0.2)',
              color: '#22c55e',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            📥 导出研究
          </button>
        </div>
      </div>

      {/* 研究进度概览 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '8px',
        marginBottom: '20px'
      }}>
        {RESEARCH_TYPES.map(type => {
          const progress = researchProgress[type.id];
          return (
            <button
              key={type.id}
              onClick={() => setActiveResearch(type.id)}
              style={{
                padding: '12px 8px',
                borderRadius: '10px',
                border: activeResearch === type.id ? '2px solid #7c3aed' : '1px solid rgba(100, 100, 120, 0.3)',
                background: progress.complete ? 'rgba(34, 197, 94, 0.15)' :
                           activeResearch === type.id ? 'rgba(124, 58, 237, 0.2)' : 'rgba(30, 30, 50, 0.5)',
                cursor: 'pointer',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              {progress.complete && (
                <span style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  fontSize: '10px'
                }}>✓</span>
              )}
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>{type.icon}</div>
              <div style={{ 
                fontSize: '11px', 
                color: activeResearch === type.id ? '#a78bfa' : '#94a3b8',
                fontWeight: activeResearch === type.id ? '600' : '400'
              }}>
                {type.name}
              </div>
              <div style={{ 
                fontSize: '9px', 
                color: '#64748b',
                marginTop: '4px'
              }}>
                {progress.hasNotes ? '📝' : '○'} {progress.hasResults ? '📎' : '○'}
              </div>
            </button>
          );
        })}
      </div>

      {/* 当前研究类型的数据源 */}
      <div style={{
        background: 'rgba(124, 58, 237, 0.1)',
        borderRadius: '10px',
        padding: '12px 16px',
        marginBottom: '20px',
        border: '1px solid rgba(124, 58, 237, 0.2)'
      }}>
        <div style={{ fontSize: '12px', color: '#a78bfa', marginBottom: '6px' }}>
          {RESEARCH_TYPES.find(t => t.id === activeResearch)?.icon} {RESEARCH_TYPES.find(t => t.id === activeResearch)?.name} 推荐数据源：
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {RESEARCH_TYPES.find(t => t.id === activeResearch)?.sources.map((source, idx) => (
            <span key={idx} style={{
              padding: '4px 10px',
              borderRadius: '12px',
              background: 'rgba(30, 30, 50, 0.8)',
              fontSize: '11px',
              color: '#e0e0e0'
            }}>
              {source}
            </span>
          ))}
        </div>
      </div>

      {/* 搜索配置 */}
      <div style={{
        background: 'rgba(30, 30, 50, 0.5)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h4 style={{ fontSize: '13px', color: '#94a3b8' }}>⚙️ 搜索配置</h4>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>搜索深度</label>
            <select
              value={searchConfig.depth}
              onChange={(e) => setSearchConfig(prev => ({ ...prev, depth: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid rgba(100, 100, 120, 0.3)',
                background: 'rgba(15, 15, 25, 0.8)',
                color: '#e0e0e0',
                fontSize: '12px'
              }}
            >
              <option value="quick">快速</option>
              <option value="standard">标准</option>
              <option value="deep">深度</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>语言</label>
            <select
              value={searchConfig.language}
              onChange={(e) => setSearchConfig(prev => ({ ...prev, language: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid rgba(100, 100, 120, 0.3)',
                background: 'rgba(15, 15, 25, 0.8)',
                color: '#e0e0e0',
                fontSize: '12px'
              }}
            >
              <option value="all">全部</option>
              <option value="zh">中文</option>
              <option value="en">English</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>时间范围</label>
            <select
              value={searchConfig.timeRange}
              onChange={(e) => setSearchConfig(prev => ({ ...prev, timeRange: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid rgba(100, 100, 120, 0.3)',
                background: 'rgba(15, 15, 25, 0.8)',
                color: '#e0e0e0',
                fontSize: '12px'
              }}
            >
              <option value="all">全部时间</option>
              <option value="week">最近一周</option>
              <option value="month">最近一月</option>
              <option value="year">最近一年</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>结果数量</label>
            <select
              value={searchConfig.resultCount}
              onChange={(e) => setSearchConfig(prev => ({ ...prev, resultCount: Number(e.target.value) }))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid rgba(100, 100, 120, 0.3)',
                background: 'rgba(15, 15, 25, 0.8)',
                color: '#e0e0e0',
                fontSize: '12px'
              }}
            >
              <option value={5}>5条</option>
              <option value={10}>10条</option>
              <option value={20}>20条</option>
              <option value={50}>50条</option>
            </select>
          </div>
        </div>
      </div>

      {/* 搜索输入和工具 */}
      <div style={{
        background: 'rgba(30, 30, 50, 0.5)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <h4 style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>
          🔎 搜索工具
        </h4>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleBatchSearch()}
            placeholder="输入搜索关键词..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              background: 'rgba(15, 15, 25, 0.8)',
              color: '#e0e0e0',
              fontSize: '14px'
            }}
          />
          <button
            onClick={handleBatchSearch}
            disabled={isSearching || !searchQuery.trim()}
            style={{
              padding: '12px 20px',
              borderRadius: '8px',
              border: 'none',
              background: isSearching ? 'rgba(100, 100, 120, 0.3)' : 'linear-gradient(135deg, #7c3aed, #a78bfa)',
              color: 'white',
              cursor: isSearching ? 'not-allowed' : 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}
          >
            {isSearching ? '⏳ 搜索中...' : '🚀 全部搜索'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {SEARCH_TOOLS.map(tool => (
            <button
              key={tool.id}
              onClick={() => handleSearch(tool.id)}
              disabled={isSearching && activeTools.includes(tool.id)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: activeTools.includes(tool.id) ? '2px solid #7c3aed' : '1px solid rgba(100, 100, 120, 0.3)',
                background: activeTools.includes(tool.id) ? 'rgba(124, 58, 237, 0.3)' : 'rgba(30, 30, 50, 0.8)',
                color: '#e0e0e0',
                cursor: isSearching && activeTools.includes(tool.id) ? 'wait' : 'pointer',
                fontSize: '11px',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px' }}>{tool.icon}</span>
                {activeTools.includes(tool.id) && <span style={{ fontSize: '12px' }}>⏳</span>}
              </div>
              <div style={{ fontWeight: '600', marginTop: '6px' }}>{tool.name}</div>
              <div style={{ color: '#64748b', fontSize: '10px' }}>{tool.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 搜索结果 */}
      {searchResults.length > 0 && (
        <div style={{
          background: 'rgba(30, 30, 50, 0.5)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '13px', color: '#94a3b8' }}>
              搜索结果 ({searchResults.length})
            </h4>
            <button
              onClick={() => setSearchResults([])}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: 'none',
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                cursor: 'pointer',
                fontSize: '10px'
              }}
            >
              清空
            </button>
          </div>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {searchResults.map(result => (
              <div key={result.id} style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(20, 20, 35, 0.8)',
                marginBottom: '8px',
                border: result.saved ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid transparent'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', color: '#e0e0e0', marginBottom: '4px' }}>{result.title}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>{result.snippet}</div>
                    <div style={{ fontSize: '10px', color: '#7c3aed' }}>{result.url}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', marginLeft: '12px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      background: result.relevance === 'high' ? 'rgba(34, 197, 94, 0.2)' :
                                 result.relevance === 'medium' ? 'rgba(251, 191, 36, 0.2)' :
                                 'rgba(100, 100, 120, 0.2)',
                      color: result.relevance === 'high' ? '#22c55e' :
                             result.relevance === 'medium' ? '#fbbf24' : '#94a3b8'
                    }}>
                      {result.relevance === 'high' ? '高相关' : result.relevance === 'medium' ? '中相关' : '低相关'}
                    </span>
                    <button
                      onClick={() => saveResult(result)}
                      disabled={result.saved}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: 'none',
                        background: result.saved ? 'rgba(34, 197, 94, 0.3)' : 'rgba(124, 58, 237, 0.2)',
                        color: result.saved ? '#22c55e' : '#a78bfa',
                        cursor: result.saved ? 'default' : 'pointer',
                        fontSize: '10px'
                      }}
                    >
                      {result.saved ? '✓ 已保存' : '+ 保存'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 已保存的结果 */}
      {savedResults.filter(r => r.category === activeResearch).length > 0 && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px',
          border: '1px solid rgba(34, 197, 94, 0.2)'
        }}>
          <h4 style={{ fontSize: '13px', color: '#22c55e', marginBottom: '12px' }}>
            📎 已保存结果 ({savedResults.filter(r => r.category === activeResearch).length})
          </h4>
          {savedResults.filter(r => r.category === activeResearch).map(result => (
            <div key={result.id} style={{
              padding: '8px 12px',
              borderRadius: '6px',
              background: 'rgba(30, 30, 50, 0.8)',
              marginBottom: '6px',
              fontSize: '12px',
              color: '#e0e0e0'
            }}>
              {result.title}
            </div>
          ))}
        </div>
      )}

      {/* 研究笔记 */}
      <div style={{
        background: 'rgba(30, 30, 50, 0.5)',
        borderRadius: '12px',
        padding: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h4 style={{ fontSize: '13px', color: '#94a3b8' }}>
            📝 {RESEARCH_TYPES.find(t => t.id === activeResearch)?.name} 研究笔记
          </h4>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            {(researchNotes[activeResearch] || '').length} 字符
            {(researchNotes[activeResearch] || '').length >= 50 && ' ✓'}
          </span>
        </div>
        <textarea
          value={researchNotes[activeResearch] || ''}
          onChange={(e) => setResearchNotes(prev => ({ ...prev, [activeResearch]: e.target.value }))}
          placeholder={`记录 ${RESEARCH_TYPES.find(t => t.id === activeResearch)?.name} 的研究发现、关键洞察、重要数据...`}
          rows={8}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            background: 'rgba(15, 15, 25, 0.8)',
            color: '#e0e0e0',
            fontSize: '13px',
            resize: 'vertical',
            lineHeight: '1.6'
          }}
        />
        
        {/* 快速模板 */}
        <div style={{ marginTop: '12px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>快速模板：</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              '## 关键发现\n- \n\n## 数据支持\n- \n\n## 行动建议\n- ',
              '## 竞品分析\n| 竞品 | 优势 | 劣势 |\n|------|------|------|\n| | | |',
              '## 用户需求\n1. 核心需求：\n2. 次要需求：\n3. 潜在需求：'
            ].map((template, idx) => (
              <button
                key={idx}
                onClick={() => setResearchNotes(prev => ({ 
                  ...prev, 
                  [activeResearch]: (prev[activeResearch] || '') + '\n\n' + template 
                }))}
                style={{
                  padding: '4px 10px',
                  borderRadius: '4px',
                  border: '1px solid rgba(100, 100, 120, 0.3)',
                  background: 'transparent',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '10px'
                }}
              >
                模板 {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ 规划阶段 ============

function PlanningPhase({ projectData, setProjectData }) {
  const [prdSections, setPrdSections] = useState({
    overview: '',
    userStories: '',
    requirements: '',
    metrics: '',
    constraints: ''
  });

  return (
    <div>
      <h2 style={{ fontSize: '20px', color: '#e0e0e0', marginBottom: '20px' }}>
        📝 规划阶段 - PRD & 技术规范
      </h2>

      {/* PRD 各部分 */}
      {[
        { key: 'overview', name: '产品概述', placeholder: '描述产品定位、目标用户、核心价值...' },
        { key: 'userStories', name: '用户故事', placeholder: '作为[用户]，我想要[功能]，以便[价值]...' },
        { key: 'requirements', name: '功能需求', placeholder: '列出核心功能和优先级...' },
        { key: 'metrics', name: '成功指标', placeholder: 'DAU、转化率、满意度等...' },
        { key: 'constraints', name: '约束条件', placeholder: '技术限制、预算、时间等...' }
      ].map(section => (
        <div key={section.key} style={{
          marginBottom: '16px',
          background: 'rgba(30, 30, 50, 0.5)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <h4 style={{ fontSize: '14px', color: '#a78bfa', marginBottom: '10px' }}>
            {section.name}
          </h4>
          <textarea
            value={prdSections[section.key]}
            onChange={(e) => setPrdSections(prev => ({ ...prev, [section.key]: e.target.value }))}
            placeholder={section.placeholder}
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              background: 'rgba(15, 15, 25, 0.8)',
              color: '#e0e0e0',
              fontSize: '13px',
              resize: 'vertical'
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ============ 审核门禁 ============

function GatePhase({ gateName, projectState, projectData }) {
  const [checks, setChecks] = useState({});

  const gateChecks = {
    gate1: [
      { id: 'prd', name: 'PRD完整性', desc: '所有必要部分已填写' },
      { id: 'tech', name: '技术可行性', desc: '方案可实现' },
      { id: 'scope', name: '范围清晰', desc: 'MVP范围明确' },
      { id: 'risk', name: '风险识别', desc: '主要风险已规划' }
    ],
    gate2: [
      { id: 'ux', name: '用户体验', desc: '界面直观易用' },
      { id: 'flow', name: '用户流程', desc: '核心流程顺畅' },
      { id: 'design', name: '视觉设计', desc: '设计风格满意' },
      { id: 'feature', name: '功能覆盖', desc: '核心功能展示' }
    ]
  };

  const currentChecks = gateChecks[gateName] || gateChecks.gate1;

  return (
    <div>
      <h2 style={{ fontSize: '20px', color: '#f97316', marginBottom: '20px' }}>
        🚧 {gateName === 'gate1' ? '审核点1 - 规划审核' : '审核点2 - 原型确认'}
      </h2>

      <div style={{
        background: 'rgba(249, 115, 22, 0.1)',
        border: '1px solid rgba(249, 115, 22, 0.3)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <p style={{ fontSize: '13px', color: '#fbbf24' }}>
          ⚠️ 此为强制审核点，必须全部通过才能继续
        </p>
      </div>

      {currentChecks.map(check => (
        <div key={check.id} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          borderRadius: '10px',
          background: checks[check.id] === 'pass' ? 'rgba(34, 197, 94, 0.1)' :
                     checks[check.id] === 'fail' ? 'rgba(239, 68, 68, 0.1)' :
                     'rgba(30, 30, 50, 0.5)',
          border: checks[check.id] === 'pass' ? '1px solid rgba(34, 197, 94, 0.3)' :
                 checks[check.id] === 'fail' ? '1px solid rgba(239, 68, 68, 0.3)' :
                 '1px solid rgba(100, 100, 120, 0.2)',
          marginBottom: '12px'
        }}>
          <div>
            <div style={{ fontSize: '14px', color: '#e0e0e0', marginBottom: '4px' }}>{check.name}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{check.desc}</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setChecks(prev => ({ ...prev, [check.id]: 'pass' }))}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                background: checks[check.id] === 'pass' ? '#22c55e' : 'rgba(34, 197, 94, 0.2)',
                color: checks[check.id] === 'pass' ? 'white' : '#22c55e',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              ✓ 通过
            </button>
            <button
              onClick={() => setChecks(prev => ({ ...prev, [check.id]: 'fail' }))}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                background: checks[check.id] === 'fail' ? '#ef4444' : 'rgba(239, 68, 68, 0.2)',
                color: checks[check.id] === 'fail' ? 'white' : '#ef4444',
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
  );
}

// ============ 右侧面板 ============

function RightPanel({ projectData, setProjectData, showTaskSplitter, setShowTaskSplitter }) {
  const [activeTab, setActiveTab] = useState('agents');

  return (
    <div style={{
      background: 'rgba(20, 20, 35, 0.8)',
      borderRadius: '12px',
      border: '1px solid rgba(124, 58, 237, 0.2)',
      overflow: 'hidden'
    }}>
      {/* Tab 切换 */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(100, 100, 120, 0.2)' }}>
        {[
          { id: 'agents', name: '🤖 Agents' },
          { id: 'claude-md', name: '📄 CLAUDE.md' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === tab.id ? 'rgba(124, 58, 237, 0.2)' : 'transparent',
              color: activeTab === tab.id ? '#a78bfa' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '12px',
              borderBottom: activeTab === tab.id ? '2px solid #7c3aed' : '2px solid transparent'
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {activeTab === 'agents' && (
        <AgentsPanel 
          projectData={projectData} 
          setProjectData={setProjectData}
          setShowTaskSplitter={setShowTaskSplitter}
        />
      )}

      {activeTab === 'claude-md' && (
        <ClaudeMdPanel 
          projectData={projectData} 
          setProjectData={setProjectData}
        />
      )}
    </div>
  );
}

// ============ Agents 面板 ============

function AgentsPanel({ projectData, setProjectData, setShowTaskSplitter }) {
  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h4 style={{ fontSize: '13px', color: '#a78bfa' }}>多Agent并行</h4>
        <button
          onClick={() => setShowTaskSplitter(true)}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '11px'
          }}
        >
          + 分割任务
        </button>
      </div>

      {/* Agent 列表 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { id: 'main', name: '主Agent', status: 'active', task: '协调整体进度' },
          { id: 'frontend', name: '前端Agent', status: 'idle', task: '等待任务分配' },
          { id: 'backend', name: '后端Agent', status: 'idle', task: '等待任务分配' },
          { id: 'test', name: '测试Agent', status: 'idle', task: '等待任务分配' }
        ].map(agent => (
          <div key={agent.id} style={{
            padding: '12px',
            borderRadius: '8px',
            background: 'rgba(30, 30, 50, 0.5)',
            border: agent.status === 'active' ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(100, 100, 120, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', color: '#e0e0e0' }}>{agent.name}</span>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: agent.status === 'active' ? '#22c55e' : '#64748b'
              }} />
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>{agent.task}</div>
          </div>
        ))}
      </div>

      {/* 上下文估算 */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        borderRadius: '8px',
        background: 'rgba(251, 191, 36, 0.1)',
        border: '1px solid rgba(251, 191, 36, 0.3)'
      }}>
        <h5 style={{ fontSize: '11px', color: '#fbbf24', marginBottom: '8px' }}>上下文分配</h5>
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
          每个Agent分配独立上下文，确保在上下文耗尽前完成任务
        </div>
      </div>
    </div>
  );
}

// ============ CLAUDE.md 面板 ============

function ClaudeMdPanel({ projectData, setProjectData }) {
  const [selectedModule, setSelectedModule] = useState('root');
  const [claudeMdContent, setClaudeMdContent] = useState({
    root: `# 项目根配置

## 全局规则
- 保持代码风格一致
- 遵循项目架构

## 模型分配
- Haiku: 简单任务
- Sonnet: 复杂编码
- Opus: 架构决策`,
    frontend: `# 前端模块配置

## 技术栈
- React/Next.js
- Tailwind CSS

## 规则
- 组件化开发
- 响应式设计`,
    backend: `# 后端模块配置

## 技术栈
- Node.js/Express
- PostgreSQL

## 规则
- RESTful API
- 输入验证`,
    utils: `# 工具模块配置

## 规则
- 纯函数优先
- 单元测试覆盖`
  });

  const modules = [
    { id: 'root', name: '📁 根目录', path: '/' },
    { id: 'frontend', name: '🎨 前端', path: '/src/frontend' },
    { id: 'backend', name: '⚙️ 后端', path: '/src/backend' },
    { id: 'utils', name: '🔧 工具', path: '/src/utils' }
  ];

  return (
    <div style={{ padding: '16px' }}>
      <h4 style={{ fontSize: '13px', color: '#a78bfa', marginBottom: '12px' }}>
        分层 CLAUDE.md
      </h4>

      {/* 模块选择 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
        {modules.map(mod => (
          <button
            key={mod.id}
            onClick={() => setSelectedModule(mod.id)}
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              border: selectedModule === mod.id ? '1px solid #7c3aed' : '1px solid rgba(100, 100, 120, 0.2)',
              background: selectedModule === mod.id ? 'rgba(124, 58, 237, 0.2)' : 'transparent',
              color: selectedModule === mod.id ? '#a78bfa' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '12px',
              textAlign: 'left'
            }}
          >
            <div>{mod.name}</div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>{mod.path}</div>
          </button>
        ))}
      </div>

      {/* 编辑区 */}
      <textarea
        value={claudeMdContent[selectedModule]}
        onChange={(e) => setClaudeMdContent(prev => ({ ...prev, [selectedModule]: e.target.value }))}
        style={{
          width: '100%',
          height: '200px',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          background: 'rgba(15, 15, 25, 0.8)',
          color: '#a78bfa',
          fontSize: '11px',
          fontFamily: 'monospace',
          resize: 'vertical'
        }}
      />
    </div>
  );
}

// ============ 任务分割器弹窗（完整版） ============

function TaskSplitterModal({ projectData, setProjectData, onClose }) {
  const [taskDescription, setTaskDescription] = useState('');
  const [estimatedTokens, setEstimatedTokens] = useState(50000);
  const [splitResult, setSplitResult] = useState(null);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [taskBreakdown, setTaskBreakdown] = useState([]);
  const [step, setStep] = useState(1); // 1: 输入, 2: 分析, 3: 分配

  const agentTypes = [
    { id: 'frontend', name: '前端Agent', icon: '🎨', skills: ['React', 'Vue', 'CSS', 'UI组件'] },
    { id: 'backend', name: '后端Agent', icon: '⚙️', skills: ['API', '数据库', '业务逻辑'] },
    { id: 'test', name: '测试Agent', icon: '🧪', skills: ['单元测试', '集成测试', 'E2E'] },
    { id: 'devops', name: 'DevOps Agent', icon: '🚀', skills: ['CI/CD', '部署', '监控'] },
    { id: 'doc', name: '文档Agent', icon: '📄', skills: ['README', 'API文档', '注释'] },
    { id: 'review', name: '审核Agent', icon: '👁️', skills: ['代码审查', '安全检查'] }
  ];

  const analyzeTask = () => {
    // 基于描述分析任务复杂度和需要的Agent类型
    const keywords = taskDescription.toLowerCase();
    const suggestedAgents = [];
    
    if (keywords.includes('前端') || keywords.includes('ui') || keywords.includes('页面') || keywords.includes('组件')) {
      suggestedAgents.push('frontend');
    }
    if (keywords.includes('后端') || keywords.includes('api') || keywords.includes('数据库') || keywords.includes('接口')) {
      suggestedAgents.push('backend');
    }
    if (keywords.includes('测试') || keywords.includes('test')) {
      suggestedAgents.push('test');
    }
    if (keywords.includes('部署') || keywords.includes('ci') || keywords.includes('docker')) {
      suggestedAgents.push('devops');
    }
    if (keywords.includes('文档') || keywords.includes('readme')) {
      suggestedAgents.push('doc');
    }
    
    // 如果没有匹配，默认建议前端+后端
    if (suggestedAgents.length === 0) {
      suggestedAgents.push('frontend', 'backend');
    }
    
    setSelectedAgents(suggestedAgents);
    setStep(2);
  };

  const calculateSplit = () => {
    // 根据Token估算和选中的Agent分割任务
    const safeContextLimit = 25000; // 每个Agent安全上下文 (留余量)
    const numAgents = selectedAgents.length;
    const tokensPerAgent = Math.ceil(estimatedTokens / numAgents);
    
    const agents = selectedAgents.map((agentId, idx) => {
      const agentInfo = agentTypes.find(a => a.id === agentId);
      return {
        id: agentId,
        name: agentInfo?.name || agentId,
        icon: agentInfo?.icon || '🤖',
        allocatedTokens: Math.min(tokensPerAgent, safeContextLimit),
        maxTokens: safeContextLimit,
        utilization: Math.min((tokensPerAgent / safeContextLimit) * 100, 100),
        subtask: taskBreakdown[idx] || `子任务 ${idx + 1}`,
        status: 'pending',
        priority: idx + 1
      };
    });

    // 检查是否需要额外Agent
    const totalAllocated = agents.reduce((sum, a) => sum + a.allocatedTokens, 0);
    const needsMore = totalAllocated < estimatedTokens;

    setSplitResult({
      totalTokens: estimatedTokens,
      numAgents,
      agents,
      needsMoreAgents: needsMore,
      remainingTokens: Math.max(0, estimatedTokens - totalAllocated),
      contextEfficiency: Math.min(100, Math.round((estimatedTokens / (numAgents * safeContextLimit)) * 100))
    });
    
    setStep(3);
  };

  const confirmSplit = () => {
    // 将分割结果添加到项目数据
    const newTasks = splitResult.agents.map((agent, idx) => ({
      id: Date.now() + idx,
      name: agent.subtask || `${agent.name} 任务`,
      agent: agent.id,
      status: 'pending',
      contextSize: agent.allocatedTokens > 20000 ? 'large' : agent.allocatedTokens > 10000 ? 'medium' : 'small',
      estimatedTokens: agent.allocatedTokens,
      priority: agent.priority,
      createdAt: new Date().toISOString()
    }));

    setProjectData(prev => ({
      ...prev,
      tasks: [...prev.tasks, ...newTasks],
      agents: splitResult.agents
    }));

    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        width: '700px',
        maxHeight: '85vh',
        background: 'linear-gradient(145deg, rgba(30,30,50,0.98), rgba(20,20,35,0.99))',
        borderRadius: '16px',
        border: '1px solid rgba(124, 58, 237, 0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid rgba(100, 100, 120, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '18px', color: '#e0e0e0', marginBottom: '4px' }}>
              ✂️ 上下文感知任务分割
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3].map(s => (
                <span key={s} style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  background: step >= s ? 'rgba(124, 58, 237, 0.3)' : 'rgba(100, 100, 120, 0.2)',
                  color: step >= s ? '#a78bfa' : '#64748b'
                }}>
                  {s === 1 ? '描述任务' : s === 2 ? '选择Agent' : '确认分配'}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            ✕ 关闭
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {/* Step 1: 任务描述 */}
          {step === 1 && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>
                  任务描述 <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="详细描述需要完成的任务，包括：&#10;- 功能目标&#10;- 技术要求&#10;- 涉及的模块（前端/后端/测试等）&#10;- 预期产出物"
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(124, 58, 237, 0.3)',
                    background: 'rgba(15, 15, 25, 0.8)',
                    color: '#e0e0e0',
                    fontSize: '13px',
                    lineHeight: '1.6'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>
                  预估上下文消耗: <span style={{ color: '#a78bfa', fontWeight: '600' }}>{estimatedTokens.toLocaleString()} tokens</span>
                </label>
                <input
                  type="range"
                  min="5000"
                  max="200000"
                  step="5000"
                  value={estimatedTokens}
                  onChange={(e) => setEstimatedTokens(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#7c3aed' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                  <span>5K (简单)</span>
                  <span>50K (中等)</span>
                  <span>100K (复杂)</span>
                  <span>200K (大型)</span>
                </div>
              </div>

              {/* 上下文参考 */}
              <div style={{
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '10px',
                padding: '12px'
              }}>
                <h5 style={{ fontSize: '12px', color: '#fbbf24', marginBottom: '8px' }}>💡 上下文估算参考</h5>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '11px', color: '#94a3b8' }}>
                  <div>• 简单组件开发：5-10K</div>
                  <div>• 中等功能模块：20-40K</div>
                  <div>• 复杂业务逻辑：50-80K</div>
                  <div>• 大型系统重构：100K+</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: 选择Agent */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '14px', color: '#e0e0e0', marginBottom: '8px' }}>选择参与的 Agent</h4>
                <p style={{ fontSize: '12px', color: '#64748b' }}>基于任务分析，系统已建议相关Agent（可手动调整）</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {agentTypes.map(agent => (
                  <button
                    key={agent.id}
                    onClick={() => {
                      setSelectedAgents(prev => 
                        prev.includes(agent.id) 
                          ? prev.filter(a => a !== agent.id)
                          : [...prev, agent.id]
                      );
                    }}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      border: selectedAgents.includes(agent.id) 
                        ? '2px solid #7c3aed' 
                        : '1px solid rgba(100, 100, 120, 0.3)',
                      background: selectedAgents.includes(agent.id) 
                        ? 'rgba(124, 58, 237, 0.2)' 
                        : 'rgba(30, 30, 50, 0.5)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '24px' }}>{agent.icon}</span>
                      <span style={{ 
                        fontSize: '14px', 
                        color: selectedAgents.includes(agent.id) ? '#a78bfa' : '#e0e0e0',
                        fontWeight: '600'
                      }}>
                        {agent.name}
                      </span>
                      {selectedAgents.includes(agent.id) && (
                        <span style={{ 
                          marginLeft: 'auto',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: 'rgba(34, 197, 94, 0.3)',
                          color: '#22c55e',
                          fontSize: '10px'
                        }}>
                          ✓ 已选
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {agent.skills.map(skill => (
                        <span key={skill} style={{
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: 'rgba(100, 100, 120, 0.2)',
                          fontSize: '10px',
                          color: '#94a3b8'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              {/* 子任务定义 */}
              {selectedAgents.length > 0 && (
                <div style={{
                  background: 'rgba(30, 30, 50, 0.5)',
                  borderRadius: '10px',
                  padding: '16px'
                }}>
                  <h5 style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>
                    定义子任务 (可选)
                  </h5>
                  {selectedAgents.map((agentId, idx) => {
                    const agent = agentTypes.find(a => a.id === agentId);
                    return (
                      <div key={agentId} style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>
                          {agent?.icon} {agent?.name}
                        </label>
                        <input
                          type="text"
                          value={taskBreakdown[idx] || ''}
                          onChange={(e) => {
                            const newBreakdown = [...taskBreakdown];
                            newBreakdown[idx] = e.target.value;
                            setTaskBreakdown(newBreakdown);
                          }}
                          placeholder={`${agent?.name} 的具体任务...`}
                          style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '6px',
                            border: '1px solid rgba(100, 100, 120, 0.3)',
                            background: 'rgba(15, 15, 25, 0.8)',
                            color: '#e0e0e0',
                            fontSize: '12px'
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Step 3: 确认分配 */}
          {step === 3 && splitResult && (
            <div>
              {/* 分配概览 */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.05))',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '16px', color: '#22c55e' }}>
                    ✅ 分配方案
                  </h4>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'rgba(34, 197, 94, 0.2)',
                    color: '#22c55e',
                    fontSize: '12px'
                  }}>
                    效率: {splitResult.contextEfficiency}%
                  </span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', color: '#a78bfa', fontWeight: '700' }}>
                      {splitResult.numAgents}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Agent 数量</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', color: '#a78bfa', fontWeight: '700' }}>
                      {Math.round(splitResult.totalTokens / 1000)}K
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>总 Tokens</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', color: '#a78bfa', fontWeight: '700' }}>
                      ~{Math.round(splitResult.totalTokens / splitResult.numAgents / 1000)}K
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>每Agent</div>
                  </div>
                </div>
              </div>

              {/* Agent 详细分配 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {splitResult.agents.map((agent, idx) => (
                  <div key={agent.id} style={{
                    padding: '14px',
                    borderRadius: '10px',
                    background: 'rgba(30, 30, 50, 0.8)',
                    border: '1px solid rgba(100, 100, 120, 0.2)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>{agent.icon}</span>
                        <div>
                          <div style={{ fontSize: '14px', color: '#e0e0e0', fontWeight: '600' }}>{agent.name}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{agent.subtask}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '13px', color: '#a78bfa' }}>
                          {Math.round(agent.allocatedTokens / 1000)}K tokens
                        </div>
                        <div style={{ fontSize: '10px', color: '#64748b' }}>
                          优先级: {agent.priority}
                        </div>
                      </div>
                    </div>
                    
                    {/* Token 使用进度条 */}
                    <div style={{
                      height: '6px',
                      background: 'rgba(100, 100, 120, 0.2)',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${agent.utilization}%`,
                        background: agent.utilization > 90 ? '#ef4444' :
                                   agent.utilization > 70 ? '#fbbf24' : '#22c55e',
                        borderRadius: '3px'
                      }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>上下文使用率</span>
                      <span style={{ 
                        fontSize: '10px', 
                        color: agent.utilization > 90 ? '#ef4444' :
                               agent.utilization > 70 ? '#fbbf24' : '#22c55e'
                      }}>
                        {Math.round(agent.utilization)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 警告信息 */}
              {splitResult.needsMoreAgents && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(251, 191, 36, 0.1)',
                  border: '1px solid rgba(251, 191, 36, 0.3)'
                }}>
                  <div style={{ fontSize: '12px', color: '#fbbf24' }}>
                    ⚠️ 当前分配可能不足，建议添加更多 Agent 或减少任务范围
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                    剩余未分配: {Math.round(splitResult.remainingTokens / 1000)}K tokens
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid rgba(100, 100, 120, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid rgba(100, 100, 120, 0.3)',
              background: 'transparent',
              color: step === 1 ? '#4b5563' : '#94a3b8',
              cursor: step === 1 ? 'not-allowed' : 'pointer',
              fontSize: '13px'
            }}
          >
            ← 上一步
          </button>
          
          {step === 1 && (
            <button
              onClick={analyzeTask}
              disabled={!taskDescription.trim()}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                background: taskDescription.trim() 
                  ? 'linear-gradient(135deg, #7c3aed, #a78bfa)' 
                  : 'rgba(100, 100, 120, 0.3)',
                color: 'white',
                cursor: taskDescription.trim() ? 'pointer' : 'not-allowed',
                fontSize: '13px',
                fontWeight: '600'
              }}
            >
              分析任务 →
            </button>
          )}
          
          {step === 2 && (
            <button
              onClick={calculateSplit}
              disabled={selectedAgents.length === 0}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                background: selectedAgents.length > 0 
                  ? 'linear-gradient(135deg, #7c3aed, #a78bfa)' 
                  : 'rgba(100, 100, 120, 0.3)',
                color: 'white',
                cursor: selectedAgents.length > 0 ? 'pointer' : 'not-allowed',
                fontSize: '13px',
                fontWeight: '600'
              }}
            >
              计算分配 →
            </button>
          )}
          
          {step === 3 && (
            <button
              onClick={confirmSplit}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #22c55e, #10b981)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600'
              }}
            >
              ✓ 确认创建任务
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ 其他阶段组件（简化版） ============

function ArchitecturePhase({ projectData, setProjectData }) {
  return (
    <div>
      <h2 style={{ fontSize: '20px', color: '#e0e0e0', marginBottom: '20px' }}>🏗️ 架构设计</h2>
      <div style={{ background: 'rgba(30, 30, 50, 0.5)', borderRadius: '12px', padding: '16px' }}>
        <p style={{ color: '#94a3b8', fontSize: '13px' }}>定义系统架构、技术选型、API设计...</p>
        <textarea
          placeholder="描述系统架构..."
          rows={8}
          style={{
            width: '100%',
            marginTop: '12px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            background: 'rgba(15, 15, 25, 0.8)',
            color: '#e0e0e0',
            fontSize: '13px'
          }}
        />
      </div>
    </div>
  );
}

function PrototypePhase({ projectData, setProjectData }) {
  return (
    <div>
      <h2 style={{ fontSize: '20px', color: '#e0e0e0', marginBottom: '20px' }}>🎨 原型开发</h2>
      <div style={{
        background: 'rgba(236, 72, 153, 0.1)',
        border: '1px solid rgba(236, 72, 153, 0.3)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px'
      }}>
        <h4 style={{ color: '#ec4899', marginBottom: '8px' }}>原型阶段 CLAUDE.md (极简)</h4>
        <pre style={{
          background: 'rgba(15, 15, 25, 0.8)',
          padding: '12px',
          borderRadius: '8px',
          fontSize: '11px',
          color: '#a78bfa'
        }}>
{`# 原型阶段
- 只做前端，不写后端
- 所有数据用 Mock
- 快速迭代`}
        </pre>
      </div>
    </div>
  );
}

function BackendPhase({ projectData, setProjectData }) {
  return (
    <div>
      <h2 style={{ fontSize: '20px', color: '#e0e0e0', marginBottom: '20px' }}>⚙️ 后端开发</h2>
      <div style={{ background: 'rgba(30, 30, 50, 0.5)', borderRadius: '12px', padding: '16px' }}>
        <p style={{ color: '#94a3b8', fontSize: '13px' }}>实现API、数据库、业务逻辑...</p>
      </div>
    </div>
  );
}

function AnalyzePhase({ projectData, setProjectData }) {
  return (
    <div>
      <h2 style={{ fontSize: '20px', color: '#e0e0e0', marginBottom: '20px' }}>🔬 代码分析</h2>
      <div style={{
        background: 'rgba(251, 191, 36, 0.1)',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '12px',
        padding: '16px'
      }}>
        <p style={{ color: '#fbbf24', fontSize: '13px' }}>分析现有代码结构，识别可优化点...</p>
      </div>
    </div>
  );
}

function DiagnosePhase({ projectData, setProjectData }) {
  return (
    <div>
      <h2 style={{ fontSize: '20px', color: '#ef4444', marginBottom: '20px' }}>🔎 问题诊断</h2>
      <div style={{
        background: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '12px',
        padding: '16px'
      }}>
        <h4 style={{ color: '#ef4444', marginBottom: '12px' }}>⚠️ 运维项目红线</h4>
        <ul style={{ color: '#fca5a5', fontSize: '13px', paddingLeft: '20px' }}>
          <li>禁止修改核心业务逻辑</li>
          <li>禁止更改数据库结构</li>
          <li>禁止删除现有功能</li>
          <li>所有修改需人工审批</li>
        </ul>
      </div>
    </div>
  );
}

function ApprovePhase({ projectData, setProjectData }) {
  return (
    <div>
      <h2 style={{ fontSize: '20px', color: '#e0e0e0', marginBottom: '20px' }}>👆 人工审批</h2>
      <div style={{ background: 'rgba(30, 30, 50, 0.5)', borderRadius: '12px', padding: '16px' }}>
        <p style={{ color: '#94a3b8', fontSize: '13px' }}>审批修复方案，确认修改位置...</p>
      </div>
    </div>
  );
}

function FixPhase({ projectData, setProjectData }) {
  return (
    <div>
      <h2 style={{ fontSize: '20px', color: '#e0e0e0', marginBottom: '20px' }}>🔧 执行修复</h2>
      <div style={{ background: 'rgba(30, 30, 50, 0.5)', borderRadius: '12px', padding: '16px' }}>
        <p style={{ color: '#94a3b8', fontSize: '13px' }}>按照审批方案执行最小化修复...</p>
      </div>
    </div>
  );
}

function OutputPhase({ projectData, projectState }) {
  const [generating, setGenerating] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState({});
  const [activePreview, setActivePreview] = useState(null);

  const outputFiles = {
    new: [
      { id: 'claude-root', name: 'CLAUDE.md', path: '/', icon: '📋', desc: '项目根配置' },
      { id: 'prd', name: 'PRD.md', path: '/docs', icon: '📄', desc: '产品需求文档' },
      { id: 'tech-spec', name: 'TECH_SPEC.md', path: '/docs', icon: '⚙️', desc: '技术规范' },
      { id: 'api-spec', name: 'API_SPEC.yaml', path: '/docs', icon: '🔗', desc: 'API定义' },
      { id: 'tasks', name: 'TASKS.md', path: '/', icon: '✅', desc: '任务清单' },
      { id: 'architecture', name: 'ARCHITECTURE.md', path: '/docs', icon: '🏗️', desc: '架构设计' },
      { id: 'claude-frontend', name: 'CLAUDE.md', path: '/src/frontend', icon: '🎨', desc: '前端配置' },
      { id: 'claude-backend', name: 'CLAUDE.md', path: '/src/backend', icon: '⚙️', desc: '后端配置' }
    ],
    developing: [
      { id: 'claude-updated', name: 'CLAUDE.md', path: '/', icon: '📋', desc: '更新后的配置' },
      { id: 'changelog', name: 'CHANGELOG.md', path: '/', icon: '📝', desc: '变更日志' },
      { id: 'tasks-updated', name: 'TASKS.md', path: '/', icon: '✅', desc: '更新后的任务' }
    ],
    production: [
      { id: 'fix-report', name: 'FIX_REPORT.md', path: '/docs', icon: '🔧', desc: '修复报告' },
      { id: 'redlines', name: 'REDLINES.md', path: '/', icon: '🔴', desc: '红线规则' }
    ]
  };

  const files = outputFiles[projectState] || outputFiles.new;

  const generateFile = (fileId) => {
    setGenerating(true);
    
    // 模拟生成文件内容
    setTimeout(() => {
      const templates = {
        'claude-root': `# Project Configuration

## 项目信息
- 名称: ${projectData.name || 'My Project'}
- 状态: ${projectState}
- 创建时间: ${new Date().toISOString().split('T')[0]}

## 模型分配策略
| 任务类型 | 推荐模型 | 成本 |
|---------|---------|------|
| 简单查询 | Haiku | $ |
| 复杂编码 | Sonnet | $$ |
| 架构决策 | Opus | $$$ |

## 全局规则
- 保持代码风格一致
- 遵循项目架构设计
- 所有更改需要测试

## 上下文管理
- 大文件分片加载
- 按需加载依赖
- 缓存常用配置
`,
        'prd': `# 产品需求文档 (PRD)

## 1. 产品概述
${projectData.description || '待填写'}

## 2. 用户故事
- 作为用户，我想要...

## 3. 功能需求
### 3.1 核心功能 (P0)
- [ ] 功能1
- [ ] 功能2

### 3.2 次要功能 (P1)
- [ ] 功能3

## 4. 非功能需求
- 性能: 响应时间 < 200ms
- 安全: HTTPS, 数据加密
- 可用性: 99.9%

## 5. 成功指标
- DAU:
- 转化率:
`,
        'tasks': `# 任务清单

## 已完成
${projectData.tasks?.filter(t => t.status === 'completed').map(t => `- [x] ${t.name}`).join('\n') || '- (暂无)'}

## 进行中
${projectData.tasks?.filter(t => t.status === 'pending').map(t => `- [ ] ${t.name}`).join('\n') || '- (暂无)'}

## 错误记录
${projectData.errors?.map(e => `- ⚠️ ${e.text} ${e.resolved ? '(已解决)' : ''}`).join('\n') || '- (暂无)'}

---
生成时间: ${new Date().toISOString()}
`,
        'claude-frontend': `# 前端模块配置

## 技术栈
- Framework: React/Next.js
- Styling: Tailwind CSS
- State: Zustand/Redux

## 组件规范
- 使用函数式组件
- Props 类型定义
- 响应式设计优先

## 禁止事项
- 不要使用 any 类型
- 不要在组件中写业务逻辑
- 不要直接操作 DOM
`,
        'claude-backend': `# 后端模块配置

## 技术栈
- Runtime: Node.js
- Framework: Express/Fastify
- Database: PostgreSQL

## API规范
- RESTful 设计
- 统一响应格式
- 错误码标准化

## 安全规则
- 输入验证必须
- SQL参数化查询
- 敏感数据加密
`,
        'redlines': `# 🔴 红线规则 - 严禁违反

## 绝对禁止
1. ❌ 修改核心业务逻辑
2. ❌ 更改数据库表结构
3. ❌ 删除任何现有功能
4. ❌ 修改认证/授权逻辑
5. ❌ 更改支付相关代码

## 修改需审批
- 配置文件变更
- 依赖版本更新
- 环境变量修改

## 允许范围
- Bug 修复（仅限定位的问题）
- 日志添加
- 注释更新
- 性能优化（不改变逻辑）

---
⚠️ 所有修改必须经过人工审批
`
      };

      setGeneratedFiles(prev => ({
        ...prev,
        [fileId]: templates[fileId] || `# ${fileId}\n\n内容生成中...`
      }));
      setGenerating(false);
    }, 500);
  };

  const generateAll = () => {
    files.forEach((file, idx) => {
      setTimeout(() => generateFile(file.id), idx * 300);
    });
  };

  const downloadFile = (fileId, fileName) => {
    const content = generatedFiles[fileId];
    if (!content) return;
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    files.forEach(file => {
      if (generatedFiles[file.id]) {
        downloadFile(file.id, file.name);
      }
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', color: '#22c55e' }}>📦 输出产出物</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={generateAll}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            🔄 生成全部
          </button>
          <button
            onClick={downloadAll}
            disabled={Object.keys(generatedFiles).length === 0}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: Object.keys(generatedFiles).length > 0 
                ? 'rgba(34, 197, 94, 0.3)' 
                : 'rgba(100, 100, 120, 0.2)',
              color: Object.keys(generatedFiles).length > 0 ? '#22c55e' : '#64748b',
              cursor: Object.keys(generatedFiles).length > 0 ? 'pointer' : 'not-allowed',
              fontSize: '12px'
            }}
          >
            📥 下载全部
          </button>
        </div>
      </div>

      {/* 完成提示 */}
      <div style={{
        background: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <h4 style={{ color: '#22c55e', marginBottom: '8px' }}>🎉 规划完成！</h4>
        <p style={{ fontSize: '13px', color: '#94a3b8' }}>
          以下文件已准备就绪，点击生成后可预览和下载
        </p>
      </div>

      {/* 文件列表 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        {files.map(file => (
          <div key={file.id} style={{
            padding: '14px',
            borderRadius: '10px',
            background: generatedFiles[file.id] 
              ? 'rgba(34, 197, 94, 0.1)' 
              : 'rgba(30, 30, 50, 0.8)',
            border: generatedFiles[file.id] 
              ? '1px solid rgba(34, 197, 94, 0.3)' 
              : '1px solid rgba(100, 100, 120, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#e0e0e0', marginBottom: '2px' }}>
                  {file.icon} {file.name}
                </div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>{file.path}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{file.desc}</div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {generatedFiles[file.id] ? (
                  <>
                    <button
                      onClick={() => setActivePreview(activePreview === file.id ? null : file.id)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: 'none',
                        background: 'rgba(124, 58, 237, 0.2)',
                        color: '#a78bfa',
                        cursor: 'pointer',
                        fontSize: '10px'
                      }}
                    >
                      👁️ 预览
                    </button>
                    <button
                      onClick={() => downloadFile(file.id, file.name)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: 'none',
                        background: 'rgba(34, 197, 94, 0.2)',
                        color: '#22c55e',
                        cursor: 'pointer',
                        fontSize: '10px'
                      }}
                    >
                      📥
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => generateFile(file.id)}
                    disabled={generating}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      border: 'none',
                      background: '#7c3aed',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '10px'
                    }}
                  >
                    生成
                  </button>
                )}
              </div>
            </div>
            
            {/* 预览区 */}
            {activePreview === file.id && generatedFiles[file.id] && (
              <div style={{
                marginTop: '10px',
                padding: '10px',
                borderRadius: '6px',
                background: 'rgba(15, 15, 25, 0.9)',
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                <pre style={{
                  fontSize: '10px',
                  color: '#a78bfa',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  margin: 0,
                  fontFamily: 'monospace'
                }}>
                  {generatedFiles[file.id]}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 分层 CLAUDE.md 说明 */}
      <div style={{
        background: 'rgba(251, 191, 36, 0.1)',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '10px',
        padding: '14px'
      }}>
        <h5 style={{ fontSize: '12px', color: '#fbbf24', marginBottom: '8px' }}>
          📁 分层 CLAUDE.md 说明
        </h5>
        <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.6' }}>
          每个模块都有独立的 CLAUDE.md 配置文件：
          <div style={{ marginTop: '8px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px' }}>
            <div>• <code>/CLAUDE.md</code> - 全局配置</div>
            <div>• <code>/src/frontend/CLAUDE.md</code> - 前端规则</div>
            <div>• <code>/src/backend/CLAUDE.md</code> - 后端规则</div>
            <div>• <code>/src/utils/CLAUDE.md</code> - 工具规则</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DefaultPhase({ phaseName }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
      <p>📝 {phaseName} 阶段开发中...</p>
    </div>
  );
}
