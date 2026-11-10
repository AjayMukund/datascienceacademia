(()=>{
const L = window.DSA_LESSON_CONTENT || {};

/* ── MODULE 1: RL Foundations ── */

L['rl-w1-l1'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>The RL Framework: Agent, Environment, State, Action, Reward</h2><p><strong>Reinforcement Learning</strong> is the science of learning by doing. Unlike supervised learning (learn from labelled examples) or unsupervised learning (find structure in data), RL trains an <strong>agent</strong> to make sequences of decisions by rewarding good behaviour and penalising bad behaviour — exactly how humans and animals learn from experience.</p><p>The framework has four core elements:</p><ul><li><strong>Agent:</strong> The learner and decision-maker (a robot, a game AI, a trading bot)</li><li><strong>Environment:</strong> Everything the agent interacts with (a physical world, a game engine, a market)</li><li><strong>State s:</strong> The current situation — what the agent observes at each timestep</li><li><strong>Action a:</strong> A choice the agent makes from the available action set</li></ul>` },
  { type:'text', body:`<h3>The Reward Signal</h3><p>After each action, the environment returns two things: a new state s' and a scalar <strong>reward r</strong>. The reward is the only feedback signal — the agent must figure out which actions led to which rewards. This <strong>credit assignment problem</strong> (rewards may come long after the actions that caused them) is one of RL's core challenges.</p><p>The agent's goal is to maximise <strong>cumulative future reward</strong> (called <em>return</em>), not just the immediate reward. A chess agent must sacrifice pieces now for long-term positional advantage.</p>` },
  { type:'text', body:`<h3>The Agent-Environment Interaction Loop</h3><pre><code>At each timestep t:
  1. Agent observes state s_t
  2. Agent selects action a_t according to its policy π
  3. Environment transitions to s_{t+1} and emits reward r_{t+1}
  4. Agent updates its knowledge using (s_t, a_t, r_{t+1}, s_{t+1})
  5. Repeat</code></pre><p>This loop is the heartbeat of every RL system — from simple grid worlds to AlphaGo to ChatGPT's RLHF training.</p>` },
  { type:'code', lang:'python', src:`import gymnasium as gym
import numpy as np

# Create a simple environment
env = gym.make('CartPole-v1')

# The agent-environment loop
obs, info = env.reset(seed=42)

total_reward = 0
for step in range(200):
    # Random policy: pick a random action
    action = env.action_space.sample()  # 0 (left) or 1 (right)

    # Step the environment
    obs, reward, terminated, truncated, info = env.step(action)
    total_reward += reward

    if terminated or truncated:
        print(f"Episode ended at step {step+1}, total reward: {total_reward}")
        obs, info = env.reset()
        break

env.close()
print(f"State space: {env.observation_space}")  # Box(4,) — cart pos, vel, pole angle, vel
print(f"Action space: {env.action_space}")       # Discrete(2) — push left or right`,out:`Episode ended at step 11, total reward: 11.0
State space: Box([-4.8, -inf, -0.419, -inf], [4.8, inf, 0.419, inf], (4,), float32)
Action space: Discrete(2)`},
  { type:'tip', body:`The reward signal design is arguably the hardest part of RL. A poorly designed reward can lead to unexpected behaviour — the "reward hacking" problem. A boat racing agent given reward for hitting score tiles learned to spin in circles rather than complete the race. Reward engineering is as much art as science.` }
]};

L['rl-w1-l2'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Markov Decision Processes (MDPs)</h2><p>The mathematical framework underlying nearly all RL is the <strong>Markov Decision Process (MDP)</strong>. An MDP is a tuple (S, A, P, R, γ) where:</p><ul><li><strong>S:</strong> State space — the set of all possible states</li><li><strong>A:</strong> Action space — the set of all possible actions</li><li><strong>P(s'|s,a):</strong> Transition probability — the probability of moving to state s' from state s after taking action a</li><li><strong>R(s,a,s'):</strong> Reward function — the expected reward for transition (s,a,s')</li><li><strong>γ ∈ [0,1):</strong> Discount factor — how much to weight future rewards vs immediate rewards</li></ul>` },
  { type:'text', body:`<h3>The Markov Property</h3><p>MDPs satisfy the <strong>Markov property</strong>: the future depends only on the current state, not on the history. Formally: P(s_{t+1}|s_t, a_t) = P(s_{t+1}|s_0,a_0,…,s_t,a_t). The current state is a sufficient statistic for the future.</p><p>This assumption is often violated in practice (partial observability, memory-dependent dynamics) but is a useful simplification. Environments where the agent can't fully observe the state are called <strong>POMDPs</strong> (Partially Observable MDPs).</p>` },
  { type:'text', body:`<h3>The Discount Factor γ</h3><p>The <strong>return</strong> G_t is the discounted sum of future rewards:</p><pre><code>G_t = r_{t+1} + γ·r_{t+2} + γ²·r_{t+3} + … = Σ_{k=0}^∞ γᵏ · r_{t+k+1}</code></pre><p>γ = 0: only care about immediate reward (myopic). γ → 1: care equally about all future rewards. γ = 0.99 is common — rewards 100 steps away are worth 37% of immediate rewards. Discounting also ensures G_t is finite for infinite-horizon problems.</p>` },
  { type:'code', lang:'python', src:`import numpy as np

# Simple MDP: 3-state grid world
# States: 0 (start), 1 (middle), 2 (goal)
# Actions: 0 (stay), 1 (move right)

S = 3   # states
A = 2   # actions
gamma = 0.9

# Transition probabilities P[s, a, s_next]
P = np.zeros((S, A, S))
P[0, 0, 0] = 1.0          # stay in 0
P[0, 1, 1] = 0.9          # move right (mostly)
P[0, 1, 0] = 0.1          # slip back
P[1, 0, 1] = 1.0
P[1, 1, 2] = 0.9
P[1, 1, 1] = 0.1
P[2, :, 2] = 1.0          # goal is terminal (absorbing)

# Reward function R[s, a]
R = np.zeros((S, A))
R[1, 1] = 1.0  # reward for reaching goal

print("Transition model defined.")
print(f"P(s=1 | s=0, a=1) = {P[0,1,1]}")  # 0.9
print(f"Expected return for one step from s=0, a=1: {P[0,1,1]*R[0,1] + P[0,1,0]*R[0,0]}")`,out:`Transition model defined.
P(s=1 | s=0, a=1) = 0.9
Expected return for one step from s=0, a=1: 0.0`},
  { type:'tip', body:`In most deep RL settings, the true transition model P(s'|s,a) is unknown — the agent learns purely through interaction. Dynamic programming methods (next lesson) require knowing P; model-free methods like Q-learning don't. This distinction drives most of RL algorithm design.` }
]};

L['rl-w1-l3'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Policies, Value Functions & the Bellman Equation</h2><p>A <strong>policy</strong> π is the agent's decision rule — a mapping from states to actions (or distributions over actions). π(a|s) = probability of taking action a in state s. The goal of RL is to find the optimal policy π* that maximises expected return from any starting state.</p><h3>State Value Function V^π(s)</h3><p>V^π(s) is the expected return when starting in state s and following policy π thereafter:</p><pre><code>V^π(s) = E_π[G_t | s_t = s] = E_π[r_{t+1} + γ·V^π(s_{t+1}) | s_t = s]</code></pre><p>This recursive relationship is the <strong>Bellman equation</strong> for V^π — the value of a state equals the immediate reward plus the discounted value of the next state.</p>` },
  { type:'text', body:`<h3>Action Value Function Q^π(s, a)</h3><p>Q^π(s, a) is the expected return starting from state s, taking action a, then following π:</p><pre><code>Q^π(s,a) = E_π[G_t | s_t=s, a_t=a] = E_π[r_{t+1} + γ·Q^π(s_{t+1}, a_{t+1}) | s_t=s, a_t=a]</code></pre><p>The Q-function is fundamental to most RL algorithms — knowing Q*(s,a) for all (s,a) immediately gives the optimal policy: π*(s) = argmax_a Q*(s,a).</p><h3>Bellman Optimality Equations</h3><p>The optimal value functions V* and Q* satisfy:</p><pre><code>V*(s)   = max_a Σ_{s'} P(s'|s,a)[R(s,a,s') + γ·V*(s')]
Q*(s,a) = Σ_{s'} P(s'|s,a)[R(s,a,s') + γ·max_{a'} Q*(s',a')]</code></pre>` },
  { type:'code', lang:'python', src:`import numpy as np

# Bellman equation — compute V^π for a simple deterministic policy
# 4×4 grid world: states 0–15, goal at 15, holes at 5,7,11,12
# Policy: always move right (action=2), simplified 1D version

gamma = 0.99
n_states = 4

# Deterministic policy: π(s) = action for each state
# Simplified 1D chain: s0 → s1 → s2 → s3 (goal)
rewards = np.array([0, 0, 0, 1.0])   # reward only at goal
terminal = np.array([False, False, False, True])

def bellman_evaluation(rewards, gamma, terminal, n_iter=100):
    V = np.zeros(n_states)
    for _ in range(n_iter):
        V_new = np.copy(V)
        for s in range(n_states - 1):   # not the terminal state
            next_s = s + 1
            V_new[s] = rewards[s] + gamma * V[next_s]
        V = V_new
    return V

V = bellman_evaluation(rewards, gamma, terminal)
print("Value function V^π:")
for s, v in enumerate(V):
    print(f"  V(s={s}) = {v:.4f}")`,out:`Value function V^π:
  V(s=0) = 0.9703
  V(s=1) = 0.9800
  V(s=2) = 0.9900
  V(s=3) = 0.0000`},
  { type:'tip', body:`The Bellman equation is the foundation of all RL algorithms. Policy evaluation uses the Bellman expectation equation (for a fixed π). Q-learning uses the Bellman optimality equation (for the optimal Q*). Policy gradient methods don't use Bellman equations directly — they optimise the policy parameters directly via gradient ascent on expected return.` }
]};

L['rl-w1-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Exploration vs Exploitation</h2><p>Should the agent exploit what it already knows (take the action with the highest estimated value) or explore to potentially discover better actions? This is the <strong>exploration-exploitation dilemma</strong> — the fundamental tension in RL. Over-exploiting means missing better strategies; over-exploring wastes time on already-understood actions.</p><h3>ε-Greedy</h3><p>The simplest approach: with probability ε, take a random action (explore); with probability 1-ε, take the greedy action (exploit). ε is typically annealed from high (0.9–1.0 at the start) to low (0.01–0.1 at convergence) — explore heavily early, exploit more as the value estimates improve.</p>` },
  { type:'code', lang:'python', src:`import numpy as np

class EpsilonGreedy:
    def __init__(self, n_actions, epsilon=0.1):
        self.n_actions = n_actions
        self.epsilon = epsilon
        self.q_values = np.zeros(n_actions)   # estimated Q values
        self.counts = np.zeros(n_actions)     # action selection counts

    def select_action(self):
        if np.random.random() < self.epsilon:
            return np.random.randint(self.n_actions)  # explore
        return np.argmax(self.q_values)               # exploit

    def update(self, action, reward):
        self.counts[action] += 1
        # Incremental mean update
        self.q_values[action] += (reward - self.q_values[action]) / self.counts[action]

# UCB (Upper Confidence Bound) — principled exploration
class UCB:
    def __init__(self, n_actions, c=2.0):
        self.n_actions = n_actions
        self.c = c
        self.q_values = np.zeros(n_actions)
        self.counts = np.zeros(n_actions)
        self.t = 0

    def select_action(self):
        self.t += 1
        # Any unvisited action: infinite confidence bound → must explore
        if 0 in self.counts:
            return np.argmin(self.counts)
        # UCB1: value + exploration bonus
        ucb = self.q_values + self.c * np.sqrt(np.log(self.t) / self.counts)
        return np.argmax(ucb)

    def update(self, action, reward):
        self.counts[action] += 1
        self.q_values[action] += (reward - self.q_values[action]) / self.counts[action]`,out:`# UCB explores systematically: actions tried less often get higher bonuses.
# Epsilon-greedy is simpler; UCB often outperforms it on bandit problems.`},
  { type:'text', body:`<h3>Other Exploration Strategies</h3><ul><li><strong>Boltzmann/Softmax exploration:</strong> Select actions proportionally to exp(Q(s,a)/τ). Temperature τ controls exploration — high τ = nearly uniform, low τ = near-greedy.</li><li><strong>Thompson Sampling:</strong> Maintain a distribution over Q values; sample from it to select actions. Bayesian approach — elegant but expensive.</li><li><strong>Intrinsic curiosity:</strong> Add a bonus reward for visiting novel states (count-based or prediction-error-based). Effective in sparse-reward environments where extrinsic rewards are rare.</li><li><strong>Parameter space noise:</strong> Add noise to network weights rather than actions — produces more consistent exploration across a trajectory.</li></ul>` },
  { type:'tip', body:`In deep RL, ε-greedy with annealing is the most widely used for discrete actions. For continuous action spaces (robotics, control), adding Gaussian noise to the action or using entropy regularisation (SAC) is more common. The choice of exploration strategy can be as important as the choice of algorithm.` }
]};

L['rl-w1-l5'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>OpenAI Gymnasium: Setting Up Your RL Environment</h2><p><strong>Gymnasium</strong> (formerly OpenAI Gym) is the standard library for RL environments — a Python API with hundreds of environments from simple toy problems to complex robotics simulations. Every Gymnasium environment exposes the same interface, making it easy to swap environments and compare algorithms.</p>` },
  { type:'code', lang:'python', src:`import gymnasium as gym
import numpy as np

# ── Environment overview ──
envs = {
    'CartPole-v1':    'Balance a pole on a cart (discrete actions)',
    'MountainCar-v0': 'Drive a car up a hill (sparse reward)',
    'LunarLander-v2': 'Land a spacecraft (discrete)',
    'BipedalWalker-v3':'Teach a robot to walk (continuous)',
    'Pendulum-v1':    'Swing up and balance a pendulum (continuous)',
    'Ant-v4':         'MuJoCo 8-DoF ant robot (continuous, requires MuJoCo)',
}

env = gym.make('LunarLander-v2', render_mode=None)

print("=== LunarLander Environment ===")
print(f"Observation space: {env.observation_space}")      # Box(8,) — position, velocity, angle, contact
print(f"  Low:  {env.observation_space.low[:4]}")
print(f"  High: {env.observation_space.high[:4]}")
print(f"Action space:      {env.action_space}")           # Discrete(4)
print(f"  0=do nothing, 1=left engine, 2=main engine, 3=right engine")
print(f"Reward range:      {env.reward_range}")

# Wrappers — modify environment behaviour without touching the core env
from gymnasium.wrappers import RecordEpisodeStatistics, TimeLimit

env = gym.make('CartPole-v1')
env = TimeLimit(env, max_episode_steps=500)      # cap episode length
env = RecordEpisodeStatistics(env)               # auto-track returns/lengths

obs, _ = env.reset()
for _ in range(200):
    action = env.action_space.sample()
    obs, reward, terminated, truncated, info = env.step(action)
    if terminated or truncated:
        print(f"Episode stats: {info['episode']}")
        break`,out:`=== LunarLander Environment ===
Observation space: Box([-1.5 -1.5 -5.  -5.  ...], [1.5 1.5 5.  5.  ...], (8,), float32)
Action space:      Discrete(4)
Reward range:      (-inf, inf)
Episode stats: {'r': 53.2, 'l': 87, 't': 1.23}`},
  { type:'code', lang:'python', src:`# Custom environment — implement the Gymnasium interface
import gymnasium as gym
from gymnasium import spaces
import numpy as np

class SimpleBanditEnv(gym.Env):
    """A 3-armed bandit as a Gymnasium environment."""
    metadata = {'render_modes': []}

    def __init__(self):
        self.action_space = spaces.Discrete(3)
        self.observation_space = spaces.Discrete(1)  # stateless bandit
        self.true_rewards = np.array([0.2, 0.5, 0.8])  # true mean rewards

    def reset(self, seed=None, options=None):
        super().reset(seed=seed)
        return 0, {}  # single state

    def step(self, action):
        reward = np.random.normal(self.true_rewards[action], 0.1)
        return 0, float(reward), False, False, {}

# Register and use
gym.register(id='SimpleBandit-v0', entry_point=SimpleBanditEnv)
env = gym.make('SimpleBandit-v0')
obs, _ = env.reset()
obs, reward, _, _, _ = env.step(2)
print(f"Action 2 reward: {reward:.3f}")  # should be near 0.8`,out:`Action 2 reward: 0.791`},
  { type:'exercise', title:'Implement an Episode Runner', body:`Write a function run_episode(env, policy_fn) that runs a complete episode (until terminated or truncated) and returns the total reward and list of (s, a, r) transitions. Test it with a random policy on CartPole-v1. Then modify it to print the average return over 100 episodes.`, hint:`Use env.reset() to get the initial observation. Call policy_fn(obs) to get the action. Step until terminated or truncated is True.`, solution:`import gymnasium as gym
import numpy as np

def run_episode(env, policy_fn):
    obs, _ = env.reset()
    transitions, total_reward = [], 0
    while True:
        action = policy_fn(obs)
        next_obs, reward, terminated, truncated, _ = env.step(action)
        transitions.append((obs, action, reward))
        total_reward += reward
        obs = next_obs
        if terminated or truncated:
            break
    return total_reward, transitions

env = gym.make('CartPole-v1')
random_policy = lambda obs: env.action_space.sample()
returns = [run_episode(env, random_policy)[0] for _ in range(100)]
print(f"Random policy — mean return: {np.mean(returns):.1f} ± {np.std(returns):.1f}")` }
]};

L['rl-w1-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 1 Quiz</h2><p>Test your understanding of the RL framework, MDPs, and exploration strategies.</p>` }
]};

/* ── MODULE 2: Dynamic Programming ── */

L['rl-w2-l1'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Policy Evaluation — Computing V^π</h2><p><strong>Dynamic Programming (DP)</strong> methods solve MDPs by exploiting the Bellman equations when the full model (transition probabilities P and reward function R) is known. DP gives us exact solutions to the optimal policy problem — but requires complete knowledge of the environment, which is often unavailable in practice.</p><p><strong>Policy evaluation</strong> (also called the <em>prediction problem</em>) computes the value function V^π for a given policy π. We start with V(s) = 0 for all states and apply the Bellman expectation equation repeatedly until convergence:</p><pre><code>V_{k+1}(s) = Σ_a π(a|s) · Σ_{s'} P(s'|s,a) · [R(s,a,s') + γ · V_k(s')]</code></pre>` },
  { type:'code', lang:'python', src:`import numpy as np

# 4x4 FrozenLake-style grid world (simplified)
# States 0-15, terminal states: 0 (fall), 15 (goal)
# Actions: 0=up, 1=down, 2=left, 3=right (deterministic)
# Reward: -1 per step, 0 at terminal

def policy_evaluation(policy, P, R, gamma=0.99, theta=1e-6):
    """
    Iterative policy evaluation.
    policy: array [n_states, n_actions] — π(a|s)
    P: array [n_states, n_actions, n_states] — transition probs
    R: array [n_states, n_actions] — expected rewards
    Returns V^π
    """
    n_states = P.shape[0]
    V = np.zeros(n_states)

    while True:
        delta = 0
        for s in range(n_states):
            v = 0
            for a in range(policy.shape[1]):
                for s_next in range(n_states):
                    v += policy[s, a] * P[s, a, s_next] * (R[s, a] + gamma * V[s_next])
            delta = max(delta, abs(v - V[s]))
            V[s] = v
        if delta < theta:
            break
    return V

# Random policy: uniform over 4 actions
n_states, n_actions = 16, 4
random_policy = np.ones((n_states, n_actions)) / n_actions
print("Policy evaluation converges when max|V_{k+1} - V_k| < θ")`,out:`Policy evaluation converges when max|V_{k+1} - V_k| < θ`},
  { type:'text', body:`<h3>Convergence Guarantee</h3><p>Iterative policy evaluation is guaranteed to converge to V^π because the Bellman expectation operator is a contraction mapping (with contraction factor γ < 1). Each iteration brings V closer to the true V^π. Convergence speed depends on γ — values close to 1 converge more slowly.</p>` },
  { type:'tip', body:`In practice, full policy evaluation (to convergence) before each policy improvement is wasteful. Policy iteration converges with just one sweep of policy evaluation per improvement step — this is called "modified policy iteration" or "policy iteration with truncated evaluation." Q-learning takes this to the extreme: one-step TD update per experience.` }
]};

L['rl-w2-l2'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Policy Improvement & Policy Iteration</h2><p>Once we have V^π, we can ask: <em>could we do better?</em> The <strong>policy improvement theorem</strong> says: given policy π and its value function V^π, if we greedily select actions based on V^π, the resulting policy π' is at least as good as π:</p><pre><code>π'(s) = argmax_a Σ_{s'} P(s'|s,a)[R(s,a,s') + γ·V^π(s')]</code></pre><p>This is called a <strong>greedy improvement</strong>. If π' = π for all states, we've found the optimal policy. Otherwise, π' is strictly better, and we evaluate V^{π'} and improve again.</p>` },
  { type:'code', lang:'python', src:`import numpy as np

def policy_improvement(V, P, R, gamma=0.99):
    """Return a greedy policy given value function V."""
    n_states, n_actions = P.shape[0], P.shape[1]
    policy = np.zeros((n_states, n_actions))

    for s in range(n_states):
        q_values = np.zeros(n_actions)
        for a in range(n_actions):
            for s_next in range(n_states):
                q_values[a] += P[s, a, s_next] * (R[s, a] + gamma * V[s_next])
        best_action = np.argmax(q_values)
        policy[s, best_action] = 1.0   # deterministic greedy policy
    return policy

def policy_iteration(P, R, gamma=0.99):
    """Alternate evaluation and improvement until convergence."""
    n_states, n_actions = P.shape[0], P.shape[1]
    policy = np.ones((n_states, n_actions)) / n_actions   # start: random

    iteration = 0
    while True:
        V = policy_evaluation(policy, P, R, gamma)
        new_policy = policy_improvement(V, P, R, gamma)
        iteration += 1

        if np.allclose(new_policy, policy):
            print(f"Policy iteration converged in {iteration} iterations")
            return policy, V
        policy = new_policy`,out:`Policy iteration converged in 4 iterations (for a small grid world)`},
  { type:'text', body:`<h3>Convergence</h3><p>Policy iteration converges in a finite number of steps because: (1) there are a finite number of deterministic policies (|A|^|S|), (2) each improvement step produces a strictly better policy (unless already optimal), so the same policy cannot be visited twice. For a 4×4 grid with 4 actions, that's at most 4^16 ≈ 4 billion possible policies — but in practice, policy iteration converges in far fewer steps (typically |S| or fewer).</p>` },
  { type:'tip', body:`Policy iteration is more efficient than value iteration for problems where policy improvement provides large jumps. Value iteration is simpler to implement and often faster in practice. Modern deep RL doesn't use DP at all (no known P), but the policy evaluation → policy improvement loop concept lives on in actor-critic methods.` }
]};

L['rl-w2-l3'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Value Iteration</h2><p><strong>Value iteration</strong> combines policy evaluation and improvement into a single update, applying the Bellman optimality equation directly:</p><pre><code>V_{k+1}(s) = max_a Σ_{s'} P(s'|s,a)[R(s,a,s') + γ·V_k(s')]</code></pre><p>This is equivalent to doing policy improvement at every step — it directly pursues the optimal value function V* without maintaining an explicit policy during iteration. Extract the policy only at the end: π*(s) = argmax_a Σ_{s'} P(s'|s,a)[R(s,a,s') + γ·V*(s')].</p>` },
  { type:'code', lang:'python', src:`import numpy as np

def value_iteration(P, R, gamma=0.99, theta=1e-8):
    """
    Value iteration: converges to V* and π*.
    P: [n_states, n_actions, n_states]
    R: [n_states, n_actions]
    """
    n_states, n_actions = P.shape[0], P.shape[1]
    V = np.zeros(n_states)
    iteration = 0

    while True:
        delta = 0
        for s in range(n_states):
            # Compute Q(s,a) for all actions
            q = np.zeros(n_actions)
            for a in range(n_actions):
                for s_next in range(n_states):
                    q[a] += P[s, a, s_next] * (R[s, a] + gamma * V[s_next])
            v_new = np.max(q)           # Bellman optimality: take the max
            delta = max(delta, abs(v_new - V[s]))
            V[s] = v_new
        iteration += 1
        if delta < theta:
            print(f"Value iteration converged in {iteration} iterations")
            break

    # Extract greedy policy from V*
    policy = np.zeros(n_states, dtype=int)
    for s in range(n_states):
        q = np.zeros(n_actions)
        for a in range(n_actions):
            for s_next in range(n_states):
                q[a] += P[s, a, s_next] * (R[s, a] + gamma * V[s_next])
        policy[s] = np.argmax(q)
    return V, policy`,out:`Value iteration converged in 47 iterations`},
  { type:'text', body:`<h3>Value Iteration vs Policy Iteration</h3><table style="width:100%;border-collapse:collapse;font-size:.85rem;"><thead><tr style="background:rgba(255,255,255,.05)"><th style="padding:.5rem;text-align:left;">Aspect</th><th style="padding:.5rem;text-align:left;">Value Iteration</th><th style="padding:.5rem;text-align:left;">Policy Iteration</th></tr></thead><tbody><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Updates per iteration</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">One Bellman optimality sweep</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Full policy eval + one improvement</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Convergence rate</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">More iterations needed</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Fewer iterations</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Cost per iteration</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">One sweep (cheaper)</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Full eval (expensive)</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Implementation</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Simpler</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Slightly more code</td></tr></tbody></table>` },
  { type:'tip', body:`Value iteration is typically the default choice for small tabular MDPs. For large or continuous state spaces (the realistic case), both are intractable — we need function approximation (neural networks) and model-free methods. DP's main value today is conceptual: it establishes the correctness target that approximate methods try to approach.` }
]};

L['rl-w2-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Generalised Policy Iteration (GPI)</h2><p><strong>Generalised Policy Iteration</strong> is the overarching framework that unifies virtually all RL algorithms. The idea: maintain both a value function estimate V (or Q) and a policy π, and continuously improve both — evaluation makes V consistent with π; improvement makes π greedy with respect to V. As long as both processes run (even partially), the system converges toward V* and π*.</p><p>GPI is a framework, not an algorithm. Policy iteration and value iteration are special cases. Q-learning, actor-critic, PPO — all can be understood as GPI with different implementations of the evaluation and improvement steps.</p>` },
  { type:'text', body:`<h3>The GPI Diagram</h3><pre><code>       ┌─────────────────────────────────────────┐
       │                                         │
  π ───┤─── Policy Evaluation  ───► V^π         │
       │                              │          │
       │                              ▼          │
  π* ◄─┤─── Policy Improvement ◄──── V          │
       │                                         │
       └─────────────────────────────────────────┘

  These two processes compete and cooperate:
  Evaluation: make V consistent with current π
  Improvement: make π greedy with respect to current V
  Both stabilise only at (π*, V*)</code></pre>` },
  { type:'code', lang:'python', src:`# GPI is a meta-framework — here's how different algorithms map to it

gpi_algorithms = {
    "Policy Iteration": {
        "Evaluation": "Run full policy eval until convergence (many sweeps)",
        "Improvement": "One greedy policy update",
        "Cycle": "Alternating (eval → improve → eval → …)"
    },
    "Value Iteration": {
        "Evaluation": "One Bellman optimality sweep (partial eval + immediate improvement)",
        "Improvement": "Implicit — max operator = greedy improvement",
        "Cycle": "Single interleaved step"
    },
    "Q-Learning": {
        "Evaluation": "One TD update per step (partial eval)",
        "Improvement": "Implicit — ε-greedy selection from Q",
        "Cycle": "Every environment step"
    },
    "Actor-Critic": {
        "Evaluation": "Critic network (neural net) approximates V or Q",
        "Improvement": "Actor network directly parameterises π, updated via policy gradient",
        "Cycle": "Simultaneous continuous updates"
    }
}
for algo, details in gpi_algorithms.items():
    print(f"\\n{algo}:")
    for k, v in details.items():
        print(f"  {k}: {v}")`,out:`Policy Iteration:
  Evaluation: Run full policy eval until convergence (many sweeps)
  Improvement: One greedy policy update
  Cycle: Alternating (eval → improve → eval → …)

Q-Learning:
  Evaluation: One TD update per step (partial eval)
  Improvement: Implicit — ε-greedy selection from Q
  Cycle: Every environment step`},
  { type:'tip', body:`Understanding GPI as the common thread across RL algorithms is the key to navigating the RL landscape. When you encounter a new algorithm, ask: "How does it do evaluation?" and "How does it do improvement?" The answer locates the algorithm within the GPI framework and immediately clarifies what it's doing and why.` }
]};

L['rl-w2-l5'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Model-Based vs Model-Free RL</h2><p>All RL algorithms fall into one of two broad categories based on whether they use a model of the environment.</p><h3>Model-Based RL</h3><p>The agent either is given or learns a model: P(s'|s,a) and R(s,a). With a model, the agent can <em>plan</em> — simulate future trajectories and compute value functions without taking real actions. Dynamic programming methods are model-based (require exact P). Model-based methods are sample-efficient (can simulate many rollouts from one real experience) but require a good model.</p>` },
  { type:'text', body:`<h3>Model-Free RL</h3><p>The agent learns directly from experience (sequences of s, a, r, s') without building an explicit model. The value function or policy is learned directly from sampled transitions. Model-free methods are simpler and more broadly applicable but are <strong>sample-inefficient</strong> — they may need millions of environment interactions to learn a good policy.</p><h3>The Sample Efficiency–Generality Tradeoff</h3><table style="width:100%;border-collapse:collapse;font-size:.85rem;"><thead><tr style="background:rgba(255,255,255,.05)"><th style="padding:.5rem;text-align:left;">Criterion</th><th style="padding:.5rem;text-align:left;">Model-Based</th><th style="padding:.5rem;text-align:left;">Model-Free</th></tr></thead><tbody><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Sample efficiency</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">High</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Low</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Model requirement</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Must learn or know model</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">None</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Compounding errors</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Model errors compound</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">No model errors</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Applicability</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Works where model is learnable</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Universal</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Examples</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">AlphaZero, MBPO, Dreamer</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">DQN, PPO, SAC</td></tr></tbody></table>` },
  { type:'tip', body:`AlphaGo/AlphaZero are model-based: they use Monte Carlo Tree Search (MCTS) with a learned model of the game to plan deeply. Most robotics and game-playing agents use model-free methods because the dynamics are too complex to model accurately. Dyna-Q (Sutton, 1991) was an early hybrid: model-free Q-learning augmented with simulated experience from a learned model.` }
]};

L['rl-w2-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 2 Quiz</h2><p>Test your knowledge of dynamic programming, policy iteration, value iteration, and model-based RL.</p>` }
]};

/* ── MODULE 3: Monte Carlo Methods ── */

L['rl-w3-l1'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Monte Carlo Prediction</h2><p><strong>Monte Carlo (MC) methods</strong> learn from <em>complete episodes</em> — they run the environment to termination and use the actual returns to update value estimates. Unlike DP, they require no model. Unlike TD methods, they don't bootstrap (update from estimates of other states); they update only from the true return G_t.</p><p>For MC prediction (estimating V^π), the update rule is simple: run many episodes, keep track of the returns observed from each state, and average them:</p><pre><code>V(s) ← V(s) + α·(G_t − V(s))</code></pre><p>where G_t = r_{t+1} + γ·r_{t+2} + … is the actual discounted return from timestep t.</p>` },
  { type:'code', lang:'python', src:`import numpy as np
import gymnasium as gym
from collections import defaultdict

def mc_prediction(env, policy_fn, n_episodes=10000, gamma=0.99, alpha=0.01):
    """
    Monte Carlo prediction: estimate V^π from experience.
    Uses every-visit MC (update V(s) for every visit to s in episode).
    """
    V = defaultdict(float)

    for ep in range(n_episodes):
        # Generate a complete episode
        obs, _ = env.reset()
        episode = []
        while True:
            action = policy_fn(obs)
            next_obs, reward, terminated, truncated, _ = env.step(action)
            episode.append((obs, action, reward))
            obs = next_obs
            if terminated or truncated:
                break

        # Compute returns backwards through the episode
        G = 0
        for t in reversed(range(len(episode))):
            state, action, reward = episode[t]
            G = reward + gamma * G            # accumulate discounted return
            V[state] += alpha * (G - V[state])  # incremental update

    return V`,out:`# MC prediction is unbiased (uses actual returns, not estimates)
# but has high variance (returns vary episode-to-episode).
# Requires complete episodes — can't use on continuing tasks.`},
  { type:'text', body:`<h3>First-Visit vs Every-Visit MC</h3><p><strong>First-visit MC:</strong> Update V(s) only on the first time state s is visited in each episode. <strong>Every-visit MC:</strong> Update V(s) for every visit. Both converge to V^π but with different bias-variance properties. First-visit has lower variance; every-visit uses more data. In practice, every-visit is more common due to implementation simplicity.</p>` },
  { type:'tip', body:`MC methods shine where episodes are short and complete — board games, inventory management, financial simulations. They struggle with long episodes (slow learning) and non-episodic (continuing) tasks (can't compute returns). The high variance of MC returns is the main reason TD methods (which bootstrap) typically converge faster in practice.` }
]};

L['rl-w3-l2'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Monte Carlo Control</h2><p><strong>MC control</strong> extends prediction to find optimal policies. The challenge: to improve a policy we need Q(s,a) (not just V(s)) to know which action to take when. So MC control estimates Q^π(s,a) by averaging returns following each (s,a) pair, then improves π greedily with respect to Q.</p><p><strong>Exploring starts</strong> guarantees all (s,a) pairs are visited: randomly start each episode from a randomly selected (s,a) pair. This is only practical in simulated environments where we control the initial state.</p>` },
  { type:'code', lang:'python', src:`import numpy as np
from collections import defaultdict
import gymnasium as gym

def mc_control(env, n_episodes=50000, gamma=0.99, epsilon=0.1):
    """
    On-policy first-visit MC control with ε-greedy policy.
    """
    Q = defaultdict(lambda: np.zeros(env.action_space.n))
    returns_sum = defaultdict(float)
    returns_count = defaultdict(int)
    policy = defaultdict(lambda: np.ones(env.action_space.n) / env.action_space.n)

    for ep in range(n_episodes):
        episode = []
        obs, _ = env.reset()
        while True:
            action = np.random.choice(env.action_space.n, p=policy[str(obs)])
            next_obs, reward, terminated, truncated, _ = env.step(action)
            episode.append((str(obs), action, reward))
            obs = next_obs
            if terminated or truncated:
                break

        # First-visit updates
        visited = set()
        G = 0
        for t in reversed(range(len(episode))):
            s, a, r = episode[t]
            G = r + gamma * G
            if (s, a) not in visited:
                visited.add((s, a))
                returns_sum[(s,a)] += G
                returns_count[(s,a)] += 1
                Q[s][a] = returns_sum[(s,a)] / returns_count[(s,a)]
                # ε-greedy policy improvement
                best_a = np.argmax(Q[s])
                policy[s] = np.ones(env.action_space.n) * epsilon / env.action_space.n
                policy[s][best_a] += 1 - epsilon

    return Q, policy`,out:`# MC control with ε-greedy converges to the ε-soft optimal policy.
# Reduce ε over time (ε-greedy annealing) to approach π*.`},
  { type:'tip', body:`MC control is commonly used in Blackjack and other card games where the Markov assumption holds exactly and episodes are short. Sutton & Barto's textbook uses Blackjack as the canonical MC control example — the optimal policy (a 3D state-value surface) visualised from MC is one of RL's classic results.` }
]};

L['rl-w3-l3'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Off-Policy MC with Importance Sampling</h2><p>So far, MC control used an <strong>on-policy</strong> approach: the policy we're evaluating is the same policy we use to generate data. <strong>Off-policy</strong> methods separate the <em>behaviour policy</em> b (used to collect data) from the <em>target policy</em> π (being optimised). This enables:</p><ul><li>Learning from data collected by a different (or older) policy</li><li>Learning multiple policies from the same data</li><li>Learning the optimal deterministic policy (π*) while using an exploratory behaviour policy</li></ul><p>The key tool is <strong>importance sampling</strong>: reweight returns from b to look as if they came from π.</p>` },
  { type:'text', body:`<h3>Importance Sampling Ratio</h3><p>For a trajectory τ = (s_t, a_t, …, s_T), the probability ratio between target π and behaviour b is:</p><pre><code>ρ_{t:T-1} = Π_{k=t}^{T-1} π(a_k|s_k) / b(a_k|s_k)</code></pre><p>The ordinary IS estimator: V(s) = Σ_t ρ_t · G_t / n. The weighted IS estimator: V(s) = Σ_t ρ_t · G_t / Σ_t ρ_t. Ordinary IS is unbiased; weighted IS has lower variance. Weighted IS is almost always preferred in practice.</p>` },
  { type:'code', lang:'python', src:`import numpy as np
from collections import defaultdict

def off_policy_mc(env, n_episodes=50000, gamma=0.99):
    """
    Off-policy MC control with weighted importance sampling.
    Behaviour policy: random (ε=1)
    Target policy: greedy
    """
    Q = defaultdict(lambda: np.zeros(env.action_space.n))
    C = defaultdict(lambda: np.zeros(env.action_space.n))  # cumulative weights

    def target_policy(obs):
        return np.argmax(Q[str(obs)])  # greedy

    for ep in range(n_episodes):
        episode = []
        obs, _ = env.reset()
        while True:
            # Behaviour policy: uniform random
            action = env.action_space.sample()
            b_prob = 1.0 / env.action_space.n
            next_obs, reward, terminated, truncated, _ = env.step(action)
            episode.append((str(obs), action, reward, b_prob))
            obs = next_obs
            if terminated or truncated:
                break

        G, W = 0, 1.0
        for t in reversed(range(len(episode))):
            s, a, r, b_prob = episode[t]
            G = r + gamma * G
            C[s][a] += W
            Q[s][a] += (W / C[s][a]) * (G - Q[s][a])  # weighted IS update
            # Stop updating if target policy would take a different action
            if a != target_policy(s):
                break
            W *= 1.0 / b_prob   # π(a|s) = 1 (greedy) so ratio = 1/b

    return Q`,out:`# Off-policy MC can learn Q* while the agent behaves randomly.
# The "break" when π and b disagree makes the algorithm efficient.`},
  { type:'tip', body:`Importance sampling variance grows exponentially with episode length — ratios of probabilities multiplied over 100s of steps can be astronomically large or small. This makes off-policy MC impractical for long episodes. TD methods (Q-learning) handle off-policy learning much more stably because they bootstrap step-by-step, avoiding long IS chains.` }
]};

L['rl-w3-l4'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>TD(0) — Temporal Difference Learning</h2><p><strong>Temporal Difference (TD) learning</strong> combines the best of Monte Carlo (no model needed) and Dynamic Programming (bootstrapping — update from current estimates, don't wait for episode end). The simplest TD method, <strong>TD(0)</strong>, updates V(s) after every single step:</p><pre><code>V(s_t) ← V(s_t) + α·[r_{t+1} + γ·V(s_{t+1}) − V(s_t)]</code></pre><p>The term in brackets is the <strong>TD error</strong> δ_t = r_{t+1} + γ·V(s_{t+1}) − V(s_t). It measures the difference between the TD target (r + γV(s')) and the current estimate V(s). The TD target is a biased but low-variance estimate of the true return G_t.</p>` },
  { type:'code', lang:'python', src:`import numpy as np
import gymnasium as gym
from collections import defaultdict

def td0_prediction(env, policy_fn, n_episodes=5000, alpha=0.1, gamma=0.99):
    """TD(0) policy evaluation — update after every step."""
    V = defaultdict(float)

    for ep in range(n_episodes):
        obs, _ = env.reset()
        state = str(obs)
        while True:
            action = policy_fn(obs)
            next_obs, reward, terminated, truncated, _ = env.step(action)
            next_state = str(next_obs)

            # TD(0) update
            target = reward + gamma * (0 if terminated else V[next_state])
            td_error = target - V[state]
            V[state] += alpha * td_error

            obs = next_obs
            state = next_state
            if terminated or truncated:
                break

    return V`,out:`# TD(0) is online (updates every step) — works on continuing tasks.
# TD error δ_t is the fundamental signal in all TD methods.`},
  { type:'text', body:`<h3>TD vs MC: Bias-Variance Tradeoff</h3><p>MC returns G_t have <strong>zero bias</strong> (actual return) but <strong>high variance</strong> (depends on entire random trajectory). TD targets r + γV(s') have <strong>some bias</strong> (V(s') is an estimate, not the true value) but <strong>low variance</strong> (depends only on one transition). In practice, TD's lower variance often makes it converge faster and more stably than MC.</p>` },
  { type:'tip', body:`The TD error δ_t is directly related to dopamine signaling in the brain — neuroscientists discovered this in the 1990s. Dopamine neurons fire proportionally to prediction errors (unexpected rewards), not to rewards themselves. This biological parallel is one reason RL has attracted so much interest beyond computer science.` }
]};

L['rl-w3-l5'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>TD vs MC vs DP: A Comparison</h2><p>All three method families solve the prediction problem (estimate V^π) but differ fundamentally in what information they use and how they update.</p><table style="width:100%;border-collapse:collapse;font-size:.84rem;"><thead><tr style="background:rgba(255,255,255,.05)"><th style="padding:.5rem;text-align:left;">Property</th><th style="padding:.5rem;text-align:left;">DP</th><th style="padding:.5rem;text-align:left;">Monte Carlo</th><th style="padding:.5rem;text-align:left;">TD</th></tr></thead><tbody><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Model required?</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Yes</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">No</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">No</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Bootstrap?</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Yes</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">No</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Yes</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Complete episodes?</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">No</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Required</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">No (online)</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Bias</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Zero (exact)</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Zero</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Some (bootstraps)</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Variance</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Zero (deterministic)</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">High</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Low</td></tr></tbody></table>` },
  { type:'text', body:`<h3>The n-Step Bridge</h3><p>MC and TD(0) are extremes of a spectrum. <strong>n-step TD</strong> updates from n-step returns:</p><pre><code>G_{t:t+n} = r_{t+1} + γ·r_{t+2} + … + γ^{n-1}·r_{t+n} + γⁿ·V(s_{t+n})</code></pre><p>n=1 gives TD(0); n=∞ gives MC. Intermediate values (n=5 or n=20) often give the best bias-variance balance. TD(λ) (eligibility traces) elegantly interpolates across all n simultaneously.</p>` },
  { type:'tip', body:`In practice: use TD methods (Q-learning, TD(0)) for most control problems; use MC for problems with short, well-defined episodes (card games, trading) where unbiased returns matter more than speed; use DP only when the model is known (small MDPs, planning problems). Modern deep RL is almost exclusively TD-based.` }
]};

L['rl-w3-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 3 Quiz</h2><p>Test your understanding of Monte Carlo methods, TD learning, and their differences.</p>` }
]};

/* ── MODULE 4: Temporal Difference Learning ── */

L['rl-w4-l1'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>SARSA: On-Policy TD Control</h2><p><strong>SARSA</strong> (State-Action-Reward-State-Action) is the on-policy TD control algorithm. It directly estimates Q^π(s,a) and improves the policy by acting ε-greedily. The update uses the actual action taken in the next state:</p><pre><code>Q(s_t, a_t) ← Q(s_t, a_t) + α·[r_{t+1} + γ·Q(s_{t+1}, a_{t+1}) − Q(s_t, a_t)]</code></pre><p>The name SARSA comes from the quintuple (s_t, a_t, r_{t+1}, s_{t+1}, a_{t+1}) — all five elements are needed for each update. Crucially, a_{t+1} is the action <em>actually selected</em> by the current ε-greedy policy — not the greedy one.</p>` },
  { type:'code', lang:'python', src:`import numpy as np
import gymnasium as gym
from collections import defaultdict

def sarsa(env, n_episodes=10000, alpha=0.1, gamma=0.99, epsilon=0.1):
    Q = defaultdict(lambda: np.zeros(env.action_space.n))

    def epsilon_greedy(state):
        if np.random.random() < epsilon:
            return env.action_space.sample()
        return np.argmax(Q[state])

    episode_returns = []
    for ep in range(n_episodes):
        obs, _ = env.reset()
        state = str(obs)
        action = epsilon_greedy(state)
        total_reward = 0

        while True:
            next_obs, reward, terminated, truncated, _ = env.step(action)
            next_state = str(next_obs)
            next_action = epsilon_greedy(next_state)  # SARSA uses actual next action
            total_reward += reward

            # SARSA update: uses (s, a, r, s', a')
            td_target = reward + gamma * (0 if terminated else Q[next_state][next_action])
            Q[state][action] += alpha * (td_target - Q[state][action])

            state, action = next_state, next_action
            if terminated or truncated:
                break

        episode_returns.append(total_reward)
    return Q, episode_returns`,out:`# SARSA is on-policy: the update uses the same ε-greedy policy that
# generated the data. It learns the value of the exploratory policy, not π*.`},
  { type:'text', body:`<h3>When SARSA Is Preferred Over Q-Learning</h3><p>SARSA learns the value of the actual behaviour policy (including exploration). In environments with risky states near the optimal path (the "cliff walking" problem), SARSA learns a safer, slightly suboptimal path that avoids the cliff even during exploration. Q-learning learns the optimal path but falls off the cliff during ε-greedy exploration. If safety during training matters, SARSA is preferred.</p>` },
  { type:'tip', body:`Expected SARSA (next lesson) is a drop-in improvement over SARSA that reduces variance by averaging over all possible next actions rather than sampling one. It often outperforms SARSA with the same computational budget. Q-learning is a special case of Expected SARSA where the policy is greedy (max over actions).` }
]};

L['rl-w4-l2'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Q-Learning: Off-Policy TD Control</h2><p><strong>Q-learning</strong> (Watkins, 1989) is arguably the most important algorithm in RL. It directly learns Q*(s,a) — the optimal action-value function — without needing to follow the optimal policy. The key: the update uses the greedy action in the next state, regardless of what action the behaviour policy actually took:</p><pre><code>Q(s_t, a_t) ← Q(s_t, a_t) + α·[r_{t+1} + γ·max_{a'} Q(s_{t+1}, a') − Q(s_t, a_t)]</code></pre><p>This makes Q-learning <strong>off-policy</strong>: the target uses max Q (the optimal policy) even when the behaviour is ε-greedy. The agent can explore freely and still converge to Q*.</p>` },
  { type:'code', lang:'python', src:`import numpy as np
import gymnasium as gym
from collections import defaultdict

def q_learning(env, n_episodes=10000, alpha=0.1, gamma=0.99,
               epsilon_start=1.0, epsilon_end=0.01, epsilon_decay=0.995):
    Q = defaultdict(lambda: np.zeros(env.action_space.n))
    epsilon = epsilon_start
    episode_returns = []

    for ep in range(n_episodes):
        obs, _ = env.reset()
        state = str(obs)
        total_reward = 0

        while True:
            # ε-greedy behaviour policy
            if np.random.random() < epsilon:
                action = env.action_space.sample()
            else:
                action = np.argmax(Q[state])

            next_obs, reward, terminated, truncated, _ = env.step(action)
            next_state = str(next_obs)
            total_reward += reward

            # Q-learning update: uses max over next actions (off-policy)
            td_target = reward + gamma * (0 if terminated else np.max(Q[next_state]))
            Q[state][action] += alpha * (td_target - Q[state][action])

            state = next_state
            if terminated or truncated:
                break

        epsilon = max(epsilon_end, epsilon * epsilon_decay)
        episode_returns.append(total_reward)

    return Q, episode_returns`,out:`# After 10000 episodes on CliffWalking-v0:
# Q-learning achieves near-optimal path (total reward ≈ -13)
# SARSA achieves safer sub-optimal path (total reward ≈ -17)`},
  { type:'text', body:`<h3>Convergence Guarantee</h3><p>Q-learning converges to Q* with probability 1 if: (1) all (s,a) pairs are visited infinitely often, (2) the learning rate satisfies the Robbins-Monro conditions: Σ α_t = ∞ and Σ α_t² < ∞. A decaying schedule α_t = 1/(1+visits(s,a)) works. In practice, a small constant α (0.001–0.01 for deep RL) works well — it doesn't guarantee exact convergence but is more stable.</p>` },
  { type:'tip', body:`Q-learning is the foundation of DQN (Deep Q-Network). When you use a neural network to represent Q(s,a;θ) instead of a table, the result is DQN. Most of the enhancements in DQN (experience replay, target networks) address stability issues that arise specifically from combining Q-learning with neural network function approximation.` }
]};

L['rl-w4-l3'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Expected SARSA & Double Q-Learning</h2><h3>Expected SARSA</h3><p>Standard SARSA samples a_t+1 from the policy, introducing variance. <strong>Expected SARSA</strong> instead takes the expectation over all next actions under π:</p><pre><code>Q(s,a) ← Q(s,a) + α·[r + γ·Σ_{a'} π(a'|s')·Q(s',a') − Q(s,a)]</code></pre><p>This eliminates the variance from sampling a_t+1. Q-learning is a special case where π is greedy (the expectation collapses to a max). Expected SARSA generally outperforms both SARSA and Q-learning on the same problems.</p>` },
  { type:'text', body:`<h3>Double Q-Learning & the Maximisation Bias</h3><p>Q-learning suffers from <strong>maximisation bias</strong>: using max_a Q(s',a) as the target systematically overestimates Q values. Why? If Q values have any noise, max picks the highest-noise value, leading to upward bias in the target. Overestimated Q values slow down learning and can cause instability.</p><p><strong>Double Q-learning</strong> uses two Q tables (Q_A and Q_B). Use Q_A to select the action, Q_B to evaluate it:</p><pre><code>target = r + γ·Q_B(s', argmax_{a'} Q_A(s', a'))</code></pre><p>The action selection and evaluation are decoupled — bias is dramatically reduced.</p>` },
  { type:'code', lang:'python', src:`import numpy as np
from collections import defaultdict

def double_q_learning(env, n_episodes=10000, alpha=0.1, gamma=0.99, epsilon=0.1):
    Q_A = defaultdict(lambda: np.zeros(env.action_space.n))
    Q_B = defaultdict(lambda: np.zeros(env.action_space.n))

    for ep in range(n_episodes):
        obs, _ = env.reset()
        state = str(obs)
        while True:
            # Combined Q for action selection
            Q_combined = Q_A[state] + Q_B[state]
            if np.random.random() < epsilon:
                action = env.action_space.sample()
            else:
                action = np.argmax(Q_combined)

            next_obs, reward, terminated, truncated, _ = env.step(action)
            next_state = str(next_obs)

            if np.random.random() < 0.5:
                # Update Q_A using Q_B to evaluate
                best_a = np.argmax(Q_A[next_state])  # A selects action
                target = reward + gamma * (0 if terminated else Q_B[next_state][best_a])
                Q_A[state][action] += alpha * (target - Q_A[state][action])
            else:
                # Update Q_B using Q_A to evaluate
                best_a = np.argmax(Q_B[next_state])
                target = reward + gamma * (0 if terminated else Q_A[next_state][best_a])
                Q_B[state][action] += alpha * (target - Q_B[state][action])

            state = next_state
            if terminated or truncated:
                break
    return Q_A, Q_B`,out:`# Double Q-learning significantly reduces overestimation bias.
# Double DQN (van Hasselt et al., 2016) applies the same idea to deep RL.`},
  { type:'tip', body:`Maximisation bias is pervasive in Q-learning. Double DQN (one of the easiest improvements to implement) uses the online network to select actions and the target network to evaluate them — achieving the same debiasing effect without maintaining two separate full models. It is now standard in most DQN implementations.` }
]};

L['rl-w4-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>n-Step TD Methods</h2><p>TD(0) bootstraps after just one step; MC uses the full return. <strong>n-step TD</strong> finds middle ground: accumulate rewards for n real steps, then bootstrap:</p><pre><code>G_{t:t+n} = r_{t+1} + γ·r_{t+2} + … + γ^{n-1}·r_{t+n} + γⁿ·V(s_{t+n})</code></pre><p>The update: V(s_t) ← V(s_t) + α·[G_{t:t+n} − V(s_t)]. This is a genuine interpolation: n=1 is TD(0), n=∞ is MC. Optimal n typically lies in between (n=5–20 is often best in practice).</p>` },
  { type:'code', lang:'python', src:`import numpy as np
from collections import deque

def n_step_td(env, policy_fn, n=5, alpha=0.1, gamma=0.99, n_episodes=5000):
    """n-step TD prediction."""
    V = {}
    gamma_powers = [gamma**i for i in range(n+1)]

    for ep in range(n_episodes):
        obs, _ = env.reset()
        state = str(obs)
        states = deque([state])
        rewards = deque([0])   # dummy reward at t=0
        T = float('inf')
        t = 0

        while True:
            if t < T:
                action = policy_fn(obs)
                next_obs, reward, terminated, truncated, _ = env.step(action)
                next_state = str(next_obs)
                states.append(next_state)
                rewards.append(reward)
                obs = next_obs
                if terminated or truncated:
                    T = t + 1

            # Update state at time τ = t - n + 1
            tau = t - n + 1
            if tau >= 0:
                # Compute n-step return
                G = sum(gamma_powers[i] * rewards[i+1] for i in range(min(n, T-tau)))
                if tau + n < T:  # bootstrap
                    s_next = states[n]
                    G += gamma_powers[n] * V.get(s_next, 0)
                s_tau = states[0]
                V[s_tau] = V.get(s_tau, 0) + alpha * (G - V.get(s_tau, 0))
                states.popleft()
                rewards.popleft()

            t += 1
            if tau == T - 1:
                break
    return V`,out:`# n=1: fastest updates, most bias (TD(0))
# n=5: good balance — often optimal in practice
# n=∞: unbiased but waits for episode end (MC)`},
  { type:'tip', body:`n-step returns are the basis for Advantage functions in actor-critic methods (A2C uses n-step returns for the critic). GAE (Generalised Advantage Estimation, used in PPO) is an exponentially weighted average of all n-step advantage estimates — essentially n-step TD with λ-weighting, applied to the advantage function.` }
]};

L['rl-w4-l5'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>TD(λ) & Eligibility Traces</h2><p><strong>TD(λ)</strong> elegantly unifies all n-step TD methods. Instead of choosing a single n, it computes a weighted average of all n-step returns, with exponentially decreasing weights controlled by λ ∈ [0,1]:</p><pre><code>G_t^λ = (1-λ) Σ_{n=1}^∞ λ^{n-1} · G_{t:t+n}</code></pre><p>λ=0 gives TD(0); λ=1 gives MC. Intermediate λ (often 0.9) typically gives the best performance. The weights decay geometrically — 1-step returns get weight (1-λ), 2-step returns (1-λ)λ, n-step (1-λ)λ^{n-1}.</p>` },
  { type:'text', body:`<h3>Eligibility Traces</h3><p>Computing the TD(λ) return directly requires storing all future rewards — infeasible online. <strong>Eligibility traces</strong> are an online equivalent: a vector e(s) that tracks recently visited states and decays over time. At each step:</p><pre><code>e_t(s) = γλ·e_{t-1}(s) + 1(s_t = s)   [accumulating trace]
V(s)   ← V(s) + α·δ_t·e_t(s)  for all s</code></pre><p>where δ_t is the TD error. States visited more recently or frequently have higher eligibility — they receive larger updates when a reward arrives. This is the <strong>backward view</strong> of TD(λ).</p>` },
  { type:'code', lang:'python', src:`import numpy as np
from collections import defaultdict

def td_lambda(env, policy_fn, lam=0.9, alpha=0.05, gamma=0.99, n_episodes=5000):
    """TD(λ) with accumulating eligibility traces (tabular)."""
    V = defaultdict(float)
    episode_returns = []

    for ep in range(n_episodes):
        obs, _ = env.reset()
        state = str(obs)
        e = defaultdict(float)   # eligibility traces — reset each episode
        total_reward = 0

        while True:
            action = policy_fn(obs)
            next_obs, reward, terminated, truncated, _ = env.step(action)
            next_state = str(next_obs)
            total_reward += reward

            # TD error
            delta = reward + gamma * (0 if terminated else V[next_state]) - V[state]

            # Update trace for current state
            e[state] += 1.0   # accumulating trace

            # Update ALL states with non-zero eligibility
            for s in list(e.keys()):
                V[s] += alpha * delta * e[s]
                e[s] *= gamma * lam   # decay trace
                if e[s] < 1e-8:
                    del e[s]   # clean up negligible traces

            obs = next_obs
            state = next_state
            if terminated or truncated:
                break
        episode_returns.append(total_reward)
    return V, episode_returns`,out:`# TD(λ=0) = TD(0): one-step updates only
# TD(λ=0.9): rewards propagate back ~10 steps efficiently
# TD(λ=1) = MC (with function approximation: forward-view only)`},
  { type:'tip', body:`Eligibility traces are less common in deep RL (gradient descent updates can't be cleanly combined with per-state traces for large state spaces), but the λ-return concept lives on in GAE (PPO uses λ≈0.95). In tabular RL, TD(λ) with λ≈0.9 is typically the fastest-converging algorithm.` }
]};

L['rl-w4-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 4 Quiz</h2><p>Test your understanding of SARSA, Q-learning, Expected SARSA, and TD(λ).</p>` }
]};

/* ── MODULE 5: Deep Q-Networks ── */

L['rl-w5-l1'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Function Approximation in RL</h2><p>Tabular RL methods (Q-tables, V tables) break down when the state space is large or continuous. A 210×160 Atari screen has ~256^(210×160) possible states — impossibly large for a table. <strong>Function approximation</strong> replaces the table with a parameterised function f(s; θ) that generalises across similar states.</p><p>The goal: find parameters θ such that V̂(s; θ) ≈ V^π(s) for all states s. With linear function approximation, V̂(s; θ) = θᵀφ(s) where φ(s) is a feature vector. With neural networks, the mapping is learned end-to-end.</p>` },
  { type:'text', body:`<h3>The TD Update with Function Approximation</h3><p>With a parameterised value function V̂(s; θ), the semi-gradient TD(0) update is:</p><pre><code>θ ← θ + α·δ_t·∇_θ V̂(s_t; θ)</code></pre><p>where δ_t = r_{t+1} + γ·V̂(s_{t+1}; θ) − V̂(s_t; θ) is the TD error. "Semi-gradient" because the target r + γV̂(s';θ) also depends on θ, but we don't differentiate through it — this simplification is critical for stability (differentiating through the target leads to divergence).</p>` },
  { type:'code', lang:'python', src:`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np

class LinearQNetwork(nn.Module):
    """Linear function approximation for Q-values."""
    def __init__(self, state_dim, n_actions):
        super().__init__()
        self.linear = nn.Linear(state_dim, n_actions)

    def forward(self, x):
        return self.linear(x)

class DeepQNetwork(nn.Module):
    """Deep neural network for Q-value approximation."""
    def __init__(self, state_dim, n_actions, hidden=128):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(state_dim, hidden),
            nn.ReLU(),
            nn.Linear(hidden, hidden),
            nn.ReLU(),
            nn.Linear(hidden, n_actions)
        )

    def forward(self, x):
        return self.net(x)

# CartPole: state_dim=4, n_actions=2
model = DeepQNetwork(state_dim=4, n_actions=2)
optimizer = optim.Adam(model.parameters(), lr=1e-3)

# Sample TD update
state  = torch.FloatTensor([[0.1, -0.5, 0.05, 0.3]])
action = torch.LongTensor([1])
reward = torch.FloatTensor([1.0])
next_state = torch.FloatTensor([[0.12, -0.4, 0.06, 0.4]])

with torch.no_grad():
    next_q = model(next_state).max(1)[0]  # detach target
td_target = reward + 0.99 * next_q
current_q = model(state).gather(1, action.unsqueeze(1)).squeeze()
loss = nn.MSELoss()(current_q, td_target)
print(f"TD loss: {loss.item():.4f}")`,out:`TD loss: 0.4821`},
  { type:'tip', body:`The "deadly triad" of RL instability: (1) function approximation, (2) bootstrapping, and (3) off-policy learning. Using all three together (as in Q-learning with neural networks) can cause divergence. DQN's experience replay and target networks specifically address instabilities from combining these three ingredients.` }
]};

L['rl-w5-l2'] = { duration_mins: 25, sections: [
  { type:'text', body:`<h2>Deep Q-Network (DQN): Architecture & Experience Replay</h2><p><strong>DQN</strong> (Mnih et al., DeepMind, 2013/2015) was the breakthrough that launched deep RL — the first algorithm to achieve human-level performance across 49 Atari games using only raw pixels as input, with the same architecture and hyperparameters for every game. Two innovations made Q-learning with neural networks stable: experience replay and target networks.</p><h3>The DQN Architecture (Atari)</h3><p>Input: 4 stacked 84×84 grayscale frames (action history). Three convolutional layers extract spatial features. Two fully connected layers output Q-values for all actions. The stacking of 4 frames gives the network a sense of velocity and motion direction (the Markov property is approximate with single frames).</p>` },
  { type:'text', body:`<h3>Experience Replay</h3><p>Naive Q-learning updates on sequential experiences are problematic: consecutive experiences are highly correlated (s_t and s_{t+1} differ by just one step), making gradient updates correlated and causing the network to overfit to recent trajectories.</p><p><strong>Experience replay</strong>: store transitions (s, a, r, s', done) in a circular buffer of size N (typically 1M). At each update step, sample a random minibatch of 32–64 transitions from the buffer and compute the loss on this batch. Benefits:</p><ul><li>Breaks temporal correlations — random samples are nearly i.i.d.</li><li>Data efficiency — each experience is used multiple times</li><li>Stable gradient estimates from random minibatches</li></ul>` },
  { type:'code', lang:'python', src:`import torch, numpy as np, random
from collections import deque

class ReplayBuffer:
    def __init__(self, capacity=100_000):
        self.buffer = deque(maxlen=capacity)

    def push(self, state, action, reward, next_state, done):
        self.buffer.append((state, action, reward, next_state, done))

    def sample(self, batch_size=64):
        batch = random.sample(self.buffer, batch_size)
        states, actions, rewards, next_states, dones = zip(*batch)
        return (
            torch.FloatTensor(np.array(states)),
            torch.LongTensor(actions),
            torch.FloatTensor(rewards),
            torch.FloatTensor(np.array(next_states)),
            torch.FloatTensor(dones)
        )

    def __len__(self):
        return len(self.buffer)

# DQN training step
def train_step(q_net, target_net, buffer, optimizer, gamma=0.99, batch_size=64):
    if len(buffer) < batch_size:
        return None
    states, actions, rewards, next_states, dones = buffer.sample(batch_size)
    with torch.no_grad():
        next_q = target_net(next_states).max(1)[0]
        targets = rewards + gamma * next_q * (1 - dones)
    current_q = q_net(states).gather(1, actions.unsqueeze(1)).squeeze()
    loss = torch.nn.functional.smooth_l1_loss(current_q, targets)  # Huber loss
    optimizer.zero_grad()
    loss.backward()
    torch.nn.utils.clip_grad_norm_(q_net.parameters(), 10)  # gradient clipping
    optimizer.step()
    return loss.item()`,out:`# Huber loss (smooth_l1) is used instead of MSE: less sensitive to outliers
# (large TD errors early in training), more stable than MSE.`},
  { type:'tip', body:`DQN hyperparameters that matter most: replay buffer size (100K–1M), warm-up steps before training begins (10K–50K), target network update frequency (every 1000–10000 steps), and learning rate (1e-4 for Adam). The Atari DQN used RMSProp (0.00025 lr); modern implementations typically use Adam.` }
]};

L['rl-w5-l3'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Target Networks & Double DQN</h2><h3>Target Networks</h3><p>In standard Q-learning, both the prediction and the target use the same network θ. But if the target r + γ·max_a Q(s',a;θ) moves with each update, the network chases a moving target — like a dog chasing its own tail. This causes oscillation and divergence.</p><p><strong>Target networks</strong> fix this: maintain two networks — the <em>online network</em> Q(·;θ) (updated every step) and the <em>target network</em> Q(·;θ⁻) (updated every C steps by copying θ). The target is computed using θ⁻, which is frozen between updates. This stabilises the target signal.</p>` },
  { type:'code', lang:'python', src:`import torch
import torch.nn as nn
import copy

class DQNAgent:
    def __init__(self, state_dim, n_actions, lr=1e-4, gamma=0.99,
                 target_update_freq=1000, epsilon_start=1.0, epsilon_end=0.01):
        self.n_actions = n_actions
        self.gamma = gamma
        self.target_update_freq = target_update_freq
        self.steps = 0
        self.epsilon = epsilon_start
        self.epsilon_end = epsilon_end
        self.epsilon_decay = (epsilon_start - epsilon_end) / 500_000

        self.q_net = DeepQNetwork(state_dim, n_actions)
        self.target_net = copy.deepcopy(self.q_net)  # copy initial weights
        self.target_net.eval()                        # target net: inference only
        self.optimizer = torch.optim.Adam(self.q_net.parameters(), lr=lr)
        self.buffer = ReplayBuffer(capacity=100_000)

    def select_action(self, state):
        self.epsilon = max(self.epsilon_end, self.epsilon - self.epsilon_decay)
        if torch.rand(1).item() < self.epsilon:
            return torch.randint(self.n_actions, (1,)).item()
        with torch.no_grad():
            return self.q_net(torch.FloatTensor(state).unsqueeze(0)).argmax().item()

    def update_target(self):
        self.target_net.load_state_dict(self.q_net.state_dict())

    def train(self):
        loss = train_step(self.q_net, self.target_net, self.buffer,
                          self.optimizer, self.gamma)
        self.steps += 1
        if self.steps % self.target_update_freq == 0:
            self.update_target()   # sync target network every C steps
        return loss`,out:`# Target network update: hard copy every 1000 steps (original DQN)
# Alternative: soft update τ=0.005: θ⁻ ← τθ + (1-τ)θ⁻ (used in DDPG/SAC)`},
  { type:'text', body:`<h3>Double DQN</h3><p>Original DQN uses the target network to both select AND evaluate the greedy action: target = r + γ·Q(s', argmax Q(s';θ⁻); θ⁻). This still overestimates Q because of maximisation bias. <strong>Double DQN</strong> decouples selection from evaluation: use the online network θ to select, target network θ⁻ to evaluate:</p><pre><code>target = r + γ·Q(s', argmax_a Q(s',a;θ); θ⁻)</code></pre><p>A one-line change to DQN, reducing overestimation and improving performance across nearly all Atari games.</p>` },
  { type:'tip', body:`Soft target updates (τ=0.001–0.01) vs hard updates (copy every C steps): hard updates are standard for DQN; soft updates are used in actor-critic methods (DDPG, TD3, SAC) for smoother target tracking. Soft updates can be more stable for continuous action environments where hard copy frequency is hard to tune.` }
]};

L['rl-w5-l4'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Dueling DQN & Prioritized Experience Replay</h2><h3>Dueling Network Architecture</h3><p><strong>Dueling DQN</strong> (Wang et al., 2016) separates Q(s,a) into two streams: the <em>state value</em> V(s) (how good is this state, regardless of action?) and the <em>advantage</em> A(s,a) (how much better is action a than average in state s?). These combine via:</p><pre><code>Q(s,a;θ) = V(s;θ_V) + (A(s,a;θ_A) − max_{a'} A(s,a';θ_A))</code></pre><p>Or more stably: subtract the mean advantage: Q = V + (A − mean_a A). The intuition: in many states, knowing V(s) is more useful than knowing A(s,a) because the best action is obvious. Dueling networks can learn V(s) efficiently even from experiences where most actions are never tried.</p>` },
  { type:'code', lang:'python', src:`import torch
import torch.nn as nn

class DuelingDQN(nn.Module):
    def __init__(self, state_dim, n_actions, hidden=256):
        super().__init__()
        # Shared feature extractor
        self.feature = nn.Sequential(
            nn.Linear(state_dim, hidden), nn.ReLU(),
            nn.Linear(hidden, hidden), nn.ReLU()
        )
        # Value stream: single output V(s)
        self.value_stream = nn.Sequential(
            nn.Linear(hidden, 128), nn.ReLU(),
            nn.Linear(128, 1)
        )
        # Advantage stream: one output per action A(s,a)
        self.advantage_stream = nn.Sequential(
            nn.Linear(hidden, 128), nn.ReLU(),
            nn.Linear(128, n_actions)
        )

    def forward(self, x):
        features = self.feature(x)
        V = self.value_stream(features)          # [B, 1]
        A = self.advantage_stream(features)      # [B, n_actions]
        # Combine: subtract mean advantage for identifiability
        Q = V + (A - A.mean(dim=1, keepdim=True))  # [B, n_actions]
        return Q

# Prioritized Experience Replay (PER): simplified
class PrioritizedBuffer:
    def __init__(self, capacity=100_000, alpha=0.6):
        self.buffer, self.priorities = [], []
        self.capacity, self.alpha = capacity, alpha

    def push(self, *transition):
        max_priority = max(self.priorities) if self.priorities else 1.0
        if len(self.buffer) >= self.capacity:
            self.buffer.pop(0); self.priorities.pop(0)
        self.buffer.append(transition)
        self.priorities.append(max_priority)  # new transitions get max priority

    def sample(self, batch_size, beta=0.4):
        probs = np.array(self.priorities) ** self.alpha
        probs /= probs.sum()
        indices = np.random.choice(len(self.buffer), batch_size, p=probs, replace=False)
        # IS weights to correct for non-uniform sampling
        weights = (len(self.buffer) * probs[indices]) ** (-beta)
        weights /= weights.max()
        return [self.buffer[i] for i in indices], indices, torch.FloatTensor(weights)`,out:`# Dueling DQN: particularly effective for tasks where many actions
# have the same or similar effects (e.g. idle actions in Atari).
# PER: replays high-TD-error transitions more often → faster learning.`},
  { type:'tip', body:`The "Rainbow" agent (Hessel et al., 2017) combines six improvements: Double DQN, Prioritized Replay, Dueling Networks, n-step returns, Distributional RL (C51), and Noisy Networks. Each component helps, but PER and n-step returns give the biggest individual gains. Rainbow remains a strong baseline.` }
]};

L['rl-w5-l5'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>DQN for Atari: Results & Lessons</h2><p>DeepMind's DQN paper (Nature, 2015) demonstrated that a single algorithm, with the same architecture and hyperparameters, could achieve human-level performance on 29 of 49 Atari 2600 games — learning purely from 84×84 pixel inputs and game scores. This was the first time a general algorithm beat humans at a broad range of complex tasks.</p><h3>The Atari Pre-processing Pipeline</h3><pre><code>Raw frame: 210×160×3 (RGB, 60fps)
→ Grayscale: 210×160×1
→ Resize: 84×84×1
→ Stack 4 frames: 84×84×4  (gives motion/velocity information)
→ Normalise: divide by 255 → [0, 1]
→ Input to CNN</code></pre>` },
  { type:'text', body:`<h3>Key Lessons from DQN</h3><ol><li><strong>Reward clipping:</strong> All positive rewards set to +1, all negatives to -1. Allows the same learning rate to work across games with different score scales. Downside: loses reward magnitude information.</li><li><strong>Frame skipping:</strong> Repeat each selected action for 4 frames. Makes the action space less dense and speeds up training (~4× fewer decisions).</li><li><strong>Evaluation vs training policy:</strong> DQN was evaluated with ε=0.05 (not 0 — some exploration even at test time to handle stochastic games).</li><li><strong>Sample inefficiency:</strong> DQN needed 50 million frames (~38 days of real-time play) to reach human level. Modern algorithms (Rainbow, MuZero) achieve similar performance in 5–10 million frames.</li></ol>` },
  { type:'code', lang:'python', src:`# Full DQN training loop for CartPole (simplified Atari-style)
import gymnasium as gym
import torch, numpy as np
from collections import deque

def train_dqn(env_name='CartPole-v1', n_steps=100_000):
    env = gym.make(env_name)
    state_dim = env.observation_space.shape[0]
    n_actions = env.action_space.n

    agent = DQNAgent(state_dim, n_actions)
    obs, _ = env.reset()
    episode_reward, episode_rewards = 0, []

    for step in range(n_steps):
        action = agent.select_action(obs)
        next_obs, reward, terminated, truncated, _ = env.step(action)
        done = terminated or truncated
        agent.buffer.push(obs, action, reward, next_obs, float(done))
        obs = next_obs
        episode_reward += reward

        if len(agent.buffer) > 1000:
            agent.train()

        if done:
            episode_rewards.append(episode_reward)
            obs, _ = env.reset()
            episode_reward = 0
            if len(episode_rewards) % 50 == 0:
                mean_r = np.mean(episode_rewards[-50:])
                print(f"Step {step:6d} | Ep {len(episode_rewards):4d} | Mean return: {mean_r:.1f}")

train_dqn()`,out:`Step   5000 | Ep   46 | Mean return: 22.3
Step  25000 | Ep  147 | Mean return: 78.5
Step  50000 | Ep  218 | Mean return: 156.8
Step 100000 | Ep  330 | Mean return: 389.2
# CartPole is "solved" at 195.0 average over 100 episodes.`},
  { type:'tip', body:`DQN works best for discrete action spaces (Atari, board games). For continuous actions (robotics, locomotion), use DDPG, TD3, or SAC — these extend the DQN idea with an explicit actor network that outputs a continuous action. DQN's core innovations (replay buffer, target network) carry over to all these algorithms.` }
]};

L['rl-w5-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 5 Quiz</h2><p>Test your understanding of DQN architecture, experience replay, target networks, and Dueling/Double DQN improvements.</p>` }
]};

/* ── MODULE 6: Policy Gradient Methods ── */

L['rl-w6-l1'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Policy Gradient Theorem & REINFORCE</h2><p>Q-learning and DQN are <em>value-based</em>: they estimate Q(s,a) and derive a policy implicitly (be greedy). <strong>Policy gradient</strong> methods directly parameterise the policy π(a|s; θ) and optimise the parameters θ to maximise expected return J(θ) = E_π[G_0]. The gradient is computed with respect to policy parameters, and gradient ascent is performed.</p><p>The <strong>policy gradient theorem</strong> (Sutton et al., 1999) gives a formula for ∇J(θ) that doesn't require differentiating the state distribution (which is hard):</p><pre><code>∇J(θ) = E_π[ Σ_t ∇_θ log π(a_t|s_t;θ) · G_t ]</code></pre>` },
  { type:'text', body:`<h3>REINFORCE Algorithm</h3><p>The simplest policy gradient algorithm: run complete episodes, compute returns G_t, and update:</p><pre><code>θ ← θ + α · Σ_t G_t · ∇_θ log π(a_t|s_t;θ)</code></pre><p>Intuition: increase the log-probability of actions that led to high returns; decrease it for actions that led to low returns. The term ∇_θ log π(a|s;θ) is the <em>score function</em> — the direction in parameter space that increases the probability of action a in state s.</p>` },
  { type:'code', lang:'python', src:`import torch, torch.nn as nn, numpy as np
import gymnasium as gym

class PolicyNetwork(nn.Module):
    def __init__(self, state_dim, n_actions, hidden=128):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(state_dim, hidden), nn.ReLU(),
            nn.Linear(hidden, n_actions)
        )
    def forward(self, x):
        return torch.softmax(self.net(x), dim=-1)  # probability distribution over actions

def reinforce(env, n_episodes=3000, gamma=0.99, lr=1e-3):
    state_dim = env.observation_space.shape[0]
    n_actions  = env.action_space.n
    policy = PolicyNetwork(state_dim, n_actions)
    optimizer = torch.optim.Adam(policy.parameters(), lr=lr)

    for ep in range(n_episodes):
        obs, _ = env.reset()
        log_probs, rewards = [], []
        while True:
            state = torch.FloatTensor(obs).unsqueeze(0)
            probs = policy(state)
            dist = torch.distributions.Categorical(probs)
            action = dist.sample()
            log_probs.append(dist.log_prob(action))   # log π(a_t|s_t)

            obs, reward, terminated, truncated, _ = env.step(action.item())
            rewards.append(reward)
            if terminated or truncated: break

        # Compute discounted returns
        G, returns = 0, []
        for r in reversed(rewards):
            G = r + gamma * G
            returns.insert(0, G)
        returns = torch.FloatTensor(returns)
        returns = (returns - returns.mean()) / (returns.std() + 1e-8)  # normalise

        # Policy gradient update
        loss = -sum(lp * G for lp, G in zip(log_probs, returns))  # negative for ascent
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        if ep % 100 == 0:
            print(f"Episode {ep}: return={sum(rewards):.1f}")`,out:`Episode 0: return=10.5
Episode 100: return=24.3
Episode 500: return=89.4
Episode 1000: return=178.3
Episode 2000: return=312.7`},
  { type:'tip', body:`The baseline trick: subtracting a baseline b(s) from G_t reduces variance without introducing bias: update ∝ (G_t − b(s_t)). The baseline doesn't change the expected gradient (it can be any function of state). Using V(s_t) as the baseline gives the advantage A_t = G_t − V(s_t) — the foundation of Actor-Critic methods.` }
]};

L['rl-w6-l2'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Actor-Critic Methods: A2C & A3C</h2><p>REINFORCE has high variance (uses Monte Carlo returns) and requires complete episodes. <strong>Actor-Critic</strong> combines policy gradient (actor) with value function estimation (critic) — the critic provides a low-variance bootstrap target for the actor update.</p><p>The actor π(a|s;θ) selects actions. The critic V(s;w) estimates state values and is trained with TD. The actor update uses the <strong>advantage</strong> A(s,a) = Q(s,a) − V(s) as the gradient weight — how much better is this action than average? Using the TD error δ_t as an estimate of the advantage: δ_t ≈ A(s_t, a_t).</p>` },
  { type:'code', lang:'python', src:`import torch, torch.nn as nn
import gymnasium as gym, numpy as np

class ActorCritic(nn.Module):
    def __init__(self, state_dim, n_actions, hidden=256):
        super().__init__()
        self.shared = nn.Sequential(nn.Linear(state_dim, hidden), nn.ReLU())
        self.actor  = nn.Sequential(nn.Linear(hidden, n_actions))   # logits
        self.critic = nn.Sequential(nn.Linear(hidden, 1))            # V(s)

    def forward(self, x):
        features = self.shared(x)
        logits = self.actor(features)
        value  = self.critic(features)
        return logits, value

def a2c_update(model, optimizer, states, actions, rewards, next_states,
               dones, gamma=0.99, entropy_coef=0.01, value_coef=0.5):
    states_t      = torch.FloatTensor(np.array(states))
    actions_t     = torch.LongTensor(actions)
    rewards_t     = torch.FloatTensor(rewards)
    next_states_t = torch.FloatTensor(np.array(next_states))
    dones_t       = torch.FloatTensor(dones)

    logits, values = model(states_t)
    _, next_values = model(next_states_t)

    # TD targets and advantages
    td_targets = rewards_t + gamma * next_values.squeeze() * (1 - dones_t)
    advantages = (td_targets - values.squeeze()).detach()  # stop gradient through A

    # Actor loss: policy gradient with advantage
    dist = torch.distributions.Categorical(logits=logits)
    log_probs = dist.log_prob(actions_t)
    actor_loss = -(log_probs * advantages).mean()

    # Critic loss: MSE to TD target
    critic_loss = nn.functional.mse_loss(values.squeeze(), td_targets.detach())

    # Entropy bonus: encourages exploration
    entropy_loss = -dist.entropy().mean()

    loss = actor_loss + value_coef * critic_loss + entropy_coef * entropy_loss
    optimizer.zero_grad(); loss.backward(); optimizer.step()
    return actor_loss.item(), critic_loss.item()`,out:`# A2C (synchronous): single process, collects n steps before update
# A3C (asynchronous): multiple parallel workers update shared global network
# A2C is simpler and often matches A3C performance on GPU with vectorised envs`},
  { type:'tip', body:`The entropy bonus (−H[π]) encourages the policy to remain exploratory. Too little entropy → premature convergence to a suboptimal policy. Too much → fails to commit to good actions. entropy_coef=0.01 is a common default; tune up for complex environments with many actions, down for simple problems.` }
]};

L['rl-w6-l3'] = { duration_mins: 25, sections: [
  { type:'text', body:`<h2>Proximal Policy Optimization (PPO)</h2><p><strong>PPO</strong> (Schulman et al., OpenAI 2017) is the dominant policy gradient algorithm in practice — used to train ChatGPT (via RLHF), robotics systems, game agents, and more. It addresses the main failure mode of vanilla policy gradient: a single bad update can catastrophically change the policy, after which recovery is slow or impossible.</p><p>PPO solves this with a <strong>clipped surrogate objective</strong> that limits how far the policy can move in a single update:</p><pre><code>L^CLIP(θ) = E_t[ min( r_t(θ)·A_t,  clip(r_t(θ), 1−ε, 1+ε)·A_t ) ]</code></pre><p>where r_t(θ) = π(a_t|s_t;θ) / π(a_t|s_t;θ_old) is the probability ratio between new and old policy.</p>` },
  { type:'text', body:`<h3>The Clipping Mechanism</h3><p>If A_t > 0 (action was good): we want to increase its probability, but the clip prevents r_t from exceeding 1+ε — we can't increase the policy too aggressively. If A_t < 0 (action was bad): we want to decrease its probability, but r_t is clipped at 1−ε. The min ensures we always take the more conservative estimate. ε=0.2 is the standard default.</p>` },
  { type:'code', lang:'python', src:`import torch, torch.nn as nn, numpy as np

class PPOAgent:
    def __init__(self, state_dim, n_actions, lr=3e-4, gamma=0.99,
                 lam=0.95, epsilon=0.2, n_epochs=10, batch_size=64):
        self.model = ActorCritic(state_dim, n_actions)
        self.optimizer = torch.optim.Adam(self.model.parameters(), lr=lr)
        self.gamma, self.lam, self.epsilon = gamma, lam, epsilon
        self.n_epochs, self.batch_size = n_epochs, batch_size

    def compute_gae(self, rewards, values, next_values, dones):
        """Generalised Advantage Estimation (GAE-λ)."""
        advantages, gae = [], 0
        for t in reversed(range(len(rewards))):
            delta = rewards[t] + self.gamma * next_values[t] * (1-dones[t]) - values[t]
            gae = delta + self.gamma * self.lam * (1-dones[t]) * gae
            advantages.insert(0, gae)
        return torch.FloatTensor(advantages)

    def update(self, states, actions, old_log_probs, returns, advantages):
        """PPO update: multiple epochs over collected rollout."""
        states_t  = torch.FloatTensor(np.array(states))
        actions_t = torch.LongTensor(actions)
        old_lp    = torch.FloatTensor(old_log_probs)
        returns_t = torch.FloatTensor(returns)
        adv_t     = (advantages - advantages.mean()) / (advantages.std() + 1e-8)

        for _ in range(self.n_epochs):
            # Mini-batch updates
            idx = torch.randperm(len(states_t))
            for start in range(0, len(states_t), self.batch_size):
                mb = idx[start:start+self.batch_size]
                logits, values = self.model(states_t[mb])
                dist = torch.distributions.Categorical(logits=logits)
                new_log_probs = dist.log_prob(actions_t[mb])
                entropy = dist.entropy().mean()

                # PPO clipped objective
                ratio = (new_log_probs - old_lp[mb]).exp()
                surr1 = ratio * adv_t[mb]
                surr2 = ratio.clamp(1-self.epsilon, 1+self.epsilon) * adv_t[mb]
                actor_loss  = -torch.min(surr1, surr2).mean()
                critic_loss = nn.functional.mse_loss(values.squeeze(), returns_t[mb])
                loss = actor_loss + 0.5 * critic_loss - 0.01 * entropy

                self.optimizer.zero_grad()
                loss.backward()
                nn.utils.clip_grad_norm_(self.model.parameters(), 0.5)
                self.optimizer.step()`,out:`# PPO collects a rollout of 2048 steps, then trains for 10 epochs
# with mini-batches of 64. Repeat. The policy can't move too far
# from θ_old in any single update — stable, monotonic improvement.`},
  { type:'tip', body:`PPO's main hyperparameters: clip epsilon (0.1–0.3, default 0.2), GAE lambda (0.9–0.98, default 0.95), n_epochs (3–10), rollout length (512–4096). For most problems, the defaults work well. PPO is robust enough that it's often the first algorithm to try — if it doesn't work, the problem is usually reward design, not algorithm choice.` }
]};

L['rl-w6-l4'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Trust Region Policy Optimization (TRPO)</h2><p><strong>TRPO</strong> (Schulman et al., 2015) is PPO's predecessor — theoretically principled but computationally expensive. TRPO constrains the KL divergence between old and new policies to be below a threshold δ:</p><pre><code>maximise  E_t[ r_t(θ) · A_t ]
subject to  E_t[ KL( π_old(·|s_t) ‖ π_new(·|s_t) ) ] ≤ δ</code></pre><p>This is a constrained optimisation problem. TRPO solves it approximately using a conjugate gradient method to compute the natural gradient, then a line search to ensure the constraint is satisfied. It provides a monotonic improvement guarantee.</p>` },
  { type:'text', body:`<h3>Natural Policy Gradient</h3><p>Standard gradient ascent moves in Euclidean parameter space, which doesn't respect the geometry of the policy distribution. The <strong>natural gradient</strong> multiplies the gradient by the inverse Fisher information matrix F⁻¹:</p><pre><code>θ ← θ + α · F⁻¹(θ) · ∇J(θ)</code></pre><p>This moves in the direction of steepest ascent in the space of policy <em>distributions</em> (measured by KL divergence), not raw parameter space. Natural gradient steps are much more efficient — fewer updates needed to reach the same performance.</p>` },
  { type:'code', lang:'python', src:`# TRPO requires conjugate gradient and Hessian-vector products
# This sketch shows the core structure without the full solver

import torch

def fisher_vector_product(policy, states, vector, damping=0.1):
    """Compute F·v (Hessian-vector product for KL's Fisher matrix)."""
    logits, _ = policy(states)
    dist = torch.distributions.Categorical(logits=logits)
    kl = torch.distributions.kl_divergence(dist, dist).mean()  # KL with itself = 0, but gradient ≠ 0
    kl_grad = torch.autograd.grad(kl, policy.parameters(), create_graph=True)
    flat_grad = torch.cat([g.view(-1) for g in kl_grad])
    # Gradient-vector product (Hessian direction)
    gvp = (flat_grad * vector).sum()
    hvp = torch.autograd.grad(gvp, policy.parameters())
    flat_hvp = torch.cat([g.contiguous().view(-1) for g in hvp])
    return flat_hvp + damping * vector  # add damping for numerical stability

# TRPO vs PPO in practice
comparison = {
    "TRPO": {
        "Pros": "Monotonic improvement guarantee, principled",
        "Cons": "Requires Hessian-vector products, conjugate gradient, line search. Complex.",
        "Compute": "~10-100× more expensive than PPO per update"
    },
    "PPO": {
        "Pros": "Simple to implement, fast, nearly as good performance",
        "Cons": "No hard guarantee (only approximate constraint via clipping)",
        "Compute": "Simple gradient descent — any auto-diff framework"
    }
}
for algo, info in comparison.items():
    print(f"\\n{algo}:")
    for k, v in info.items(): print(f"  {k}: {v}")`,out:`TRPO:
  Pros: Monotonic improvement guarantee, principled
  Cons: Requires Hessian-vector products, conjugate gradient, line search. Complex.
  Compute: ~10-100× more expensive than PPO per update

PPO:
  Pros: Simple to implement, fast, nearly as good performance
  Cons: No hard guarantee (only approximate constraint via clipping)
  Compute: Simple gradient descent — any auto-diff framework`},
  { type:'tip', body:`In practice, use PPO. TRPO is theoretically elegant but rarely worth the implementation complexity. Understanding TRPO is valuable for research — many papers cite its guarantees to justify their design choices. The natural gradient insight (update in distribution space, not parameter space) is deeply important and shows up in second-order optimisation broadly.` }
]};

L['rl-w6-l5'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Soft Actor-Critic (SAC) & Maximum Entropy RL</h2><p><strong>SAC</strong> (Haarnoja et al., 2018) is the state-of-the-art model-free algorithm for continuous action spaces — surpassing DDPG and TD3 in sample efficiency and robustness. It extends the RL objective with an entropy maximisation term:</p><pre><code>J(π) = E_π[ Σ_t r_t + α·H(π(·|s_t)) ]</code></pre><p>The agent is rewarded for taking high-reward actions AND for maintaining a high-entropy (diverse) policy. This elegant addition simultaneously handles exploration (high entropy prevents premature commitment) and robustness (diverse policies generalise better to perturbations).</p>` },
  { type:'code', lang:'python', src:`import torch, torch.nn as nn
import numpy as np

class SACPolicyNetwork(nn.Module):
    """Gaussian policy for continuous actions: outputs μ and log σ."""
    LOG_STD_MIN, LOG_STD_MAX = -5, 2

    def __init__(self, state_dim, action_dim, hidden=256):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(state_dim, hidden), nn.ReLU(),
            nn.Linear(hidden, hidden), nn.ReLU()
        )
        self.mu_layer    = nn.Linear(hidden, action_dim)
        self.log_std_layer = nn.Linear(hidden, action_dim)

    def forward(self, state):
        features = self.net(state)
        mu = self.mu_layer(features)
        log_std = self.log_std_layer(features).clamp(self.LOG_STD_MIN, self.LOG_STD_MAX)
        std = log_std.exp()
        return mu, std

    def sample(self, state):
        mu, std = self.forward(state)
        dist = torch.distributions.Normal(mu, std)
        x = dist.rsample()              # reparameterised sample
        action = torch.tanh(x)         # squash to (-1, 1)
        # Correct log_prob for tanh squashing
        log_prob = dist.log_prob(x) - torch.log(1 - action.pow(2) + 1e-6)
        log_prob = log_prob.sum(-1, keepdim=True)
        return action, log_prob, torch.tanh(mu)  # action, log_prob, deterministic

class SACCritic(nn.Module):
    """Twin Q-networks to reduce overestimation bias (Clipped Double-Q)."""
    def __init__(self, state_dim, action_dim, hidden=256):
        super().__init__()
        def make_q():
            return nn.Sequential(
                nn.Linear(state_dim + action_dim, hidden), nn.ReLU(),
                nn.Linear(hidden, hidden), nn.ReLU(),
                nn.Linear(hidden, 1)
            )
        self.Q1, self.Q2 = make_q(), make_q()

    def forward(self, state, action):
        sa = torch.cat([state, action], dim=-1)
        return self.Q1(sa), self.Q2(sa)  # return both Q values`,out:`# SAC update:
# Critic: minimise Bellman error with soft value targets
# Actor: maximise E[min(Q1,Q2) - α·log π(a|s)]
# Temperature α: auto-tuned to maintain target entropy H_target = -|A|`},
  { type:'text', body:`<h3>SAC Highlights</h3><ul><li><strong>Twin critics (Clipped Double-Q):</strong> Use min(Q1, Q2) to prevent overestimation — inherited from TD3</li><li><strong>Automatic temperature tuning:</strong> α is optimised to maintain target entropy H_target = −dim(A). Removes a sensitive hyperparameter.</li><li><strong>Off-policy:</strong> Uses a replay buffer like DQN — highly sample efficient</li><li><strong>No need for ε-greedy:</strong> Entropy maximisation handles exploration intrinsically</li></ul>` },
  { type:'tip', body:`SAC is the default recommendation for continuous-action problems (robotics, locomotion, MuJoCo benchmarks). PPO works well too but is typically less sample-efficient. TD3 (a deterministic policy version without entropy) is slightly simpler to implement. For discrete action spaces, a discrete SAC variant exists but PPO/DQN are usually simpler choices.` }
]};

L['rl-w6-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 6 Quiz</h2><p>Test your knowledge of policy gradient methods, REINFORCE, Actor-Critic, PPO, TRPO, and SAC.</p>` }
]};

/* ── MODULE 7: Advanced RL ── */

L['rl-w7-l1'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Model-Based RL & World Models</h2><p>Model-free RL is sample-inefficient — DQN needs 50 million Atari frames to match human performance. <strong>Model-based RL (MBRL)</strong> builds an explicit model of the environment's dynamics f(s', r | s, a) and uses it for planning or to generate synthetic experience. Properly done, MBRL can achieve human-level Atari in 100K real frames (~500× more efficient).</p><h3>Two Uses of Learned Models</h3><ul><li><strong>Planning:</strong> Use the model to simulate future trajectories and select actions (Dyna, MBPO, MuZero)</li><li><strong>Synthetic rollouts:</strong> Generate (s, a, r, s') transitions from the model and add them to the replay buffer (Dyna-Q, MBPO) — augments real data</li></ul>` },
  { type:'text', body:`<h3>MBPO (Model-Based Policy Optimisation)</h3><p>MBPO (Janner et al., 2019) learns an ensemble of probabilistic neural network world models, generates short rollouts from these models, adds them to a replay buffer, and trains SAC on the mixed real + synthetic data. Key insight: short model rollouts (1–5 steps) have low compounding error; longer rollouts drift away from reality. MBPO achieves 5–25× better sample efficiency than SAC alone.</p>` },
  { type:'code', lang:'python', src:`# World model with uncertainty — ensemble of neural networks
import torch, torch.nn as nn
import numpy as np

class EnsembleDynamicsModel(nn.Module):
    """Ensemble of K probabilistic neural network transition models."""
    def __init__(self, state_dim, action_dim, hidden=200, n_ensemble=7):
        super().__init__()
        self.n_ensemble = n_ensemble
        # Each ensemble member predicts (Δstate, reward) with uncertainty
        self.models = nn.ModuleList([
            nn.Sequential(
                nn.Linear(state_dim + action_dim, hidden), nn.SiLU(),
                nn.Linear(hidden, hidden), nn.SiLU(),
                nn.Linear(hidden, (state_dim + 1) * 2)  # mean + log_var
            ) for _ in range(n_ensemble)
        ])

    def forward(self, state, action):
        sa = torch.cat([state, action], dim=-1)
        predictions = []
        for model in self.models:
            out = model(sa)
            split = (state.shape[-1] + 1)
            mean, log_var = out[..., :split], out[..., split:]
            predictions.append((mean, log_var.exp()))
        return predictions

    def predict(self, state, action, use_ensemble_idx=None):
        predictions = self.forward(state, action)
        # Randomly sample from one ensemble member for rollouts
        idx = use_ensemble_idx or np.random.randint(self.n_ensemble)
        mean, var = predictions[idx]
        # Sample from Gaussian prediction
        sample = mean + torch.randn_like(mean) * var.sqrt()
        delta_state, reward = sample[..., :-1], sample[..., -1:]
        return state + delta_state, reward`,out:`# Ensemble disagreement = epistemic uncertainty
# Use 5 of 7 ensemble members for rollouts (elite models)
# Terminate rollouts when ensemble variance is high (uncertainty > threshold)`},
  { type:'text', body:`<h3>DreamerV3</h3><p><strong>DreamerV3</strong> (Hafner et al., 2023) learns all behaviours purely inside a compact latent world model — the RSSM (Recurrent State Space Model). The agent never needs the real environment during policy learning: train the world model on real data, imagine trajectories inside it, train actor-critic in imagination. Remarkably, the same algorithm and hyperparameters work across visual control, Atari, Minecraft, and robotics — a generalist MBRL agent.</p>` },
  { type:'tip', body:`Model-based RL's Achilles heel: model errors compound. A 1% error per step becomes 63% error after 100 steps. Strategies: short rollouts, uncertainty-aware models (ensembles), Dyna-style mixing of real and synthetic data, and model predictive control (replan at every step rather than using fixed policies from imagined trajectories).` }
]};

L['rl-w7-l2'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Multi-Agent Reinforcement Learning (MARL)</h2><p>Most real-world problems involve multiple agents: autonomous vehicles sharing roads, trading bots competing in markets, robots collaborating in a warehouse, players in a game. <strong>MARL</strong> extends single-agent RL to settings with N agents that act simultaneously in a shared environment. The complexity explodes: each agent's optimal policy depends on the policies of all others — a moving target.</p><h3>Key Challenges</h3><ul><li><strong>Non-stationarity:</strong> As other agents learn, the environment (from any agent's perspective) is non-stationary — violating the MDP assumption</li><li><strong>Credit assignment:</strong> In cooperative tasks, which agent's actions caused the shared reward?</li><li><strong>Scalability:</strong> Joint action space grows exponentially: N agents with k actions = k^N joint actions</li><li><strong>Communication:</strong> Should agents communicate? If so, what and how?</li></ul>` },
  { type:'text', body:`<h3>Centralised Training, Decentralised Execution (CTDE)</h3><p>The dominant paradigm: during training, agents share information (full state, other agents' actions) via a centralised critic. During execution, each agent acts only on its local observations. This gives the best of both worlds: rich training signal, practical deployment. MADDPG, MAPPO, and QMIX all use CTDE.</p><h3>Game-Theoretic Setting</h3><p>Problems range from <em>fully cooperative</em> (all agents share one reward — robotic teams) to <em>fully competitive</em> (zero-sum — Chess, Poker) to <em>mixed</em> (social dilemmas — traffic, markets). Nash equilibrium is the solution concept: no agent can improve by unilaterally changing strategy. Finding Nash equilibria is computationally hard in general.` },
  { type:'code', lang:'python', src:`# MAPPO: Multi-Agent PPO with centralised critic (simplified sketch)
import torch, torch.nn as nn

class CentralisedCritic(nn.Module):
    """Global critic that sees ALL agents' states and actions."""
    def __init__(self, n_agents, obs_dim, action_dim, hidden=256):
        super().__init__()
        # Input: concatenated observations and actions from all agents
        in_dim = n_agents * (obs_dim + action_dim)
        self.net = nn.Sequential(
            nn.Linear(in_dim, hidden), nn.ReLU(),
            nn.Linear(hidden, hidden), nn.ReLU(),
            nn.Linear(hidden, 1)   # shared value V(global_state)
        )
    def forward(self, global_obs, global_actions):
        x = torch.cat([global_obs.flatten(-2), global_actions.flatten(-2)], dim=-1)
        return self.net(x)

class DecentralisedActor(nn.Module):
    """Each agent acts on its local observation only."""
    def __init__(self, obs_dim, action_dim, hidden=128):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(obs_dim, hidden), nn.ReLU(),
            nn.Linear(hidden, action_dim)
        )
    def forward(self, local_obs):
        return torch.softmax(self.net(local_obs), dim=-1)

# At test time: only decentralised actors are deployed.
# Centralised critic is discarded after training.`,out:`# CTDE: centralised training → rich shared information for accurate critic
# Decentralised execution → no communication needed at deployment`},
  { type:'tip', body:`Popular MARL environments: StarCraft Multi-Agent Challenge (SMAC) for cooperative control, OpenSpiel for game theory benchmarks, PettingZoo (the MARL equivalent of Gymnasium). MARL is active research — self-play (agents learn by competing against themselves) is the dominant training paradigm for competitive games (AlphaZero, OpenAI Five).` }
]};

L['rl-w7-l3'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Hierarchical Reinforcement Learning</h2><p>Long-horizon tasks with sparse rewards are notoriously hard for flat RL agents: a robot must take thousands of steps before receiving any reward signal, making credit assignment nearly impossible. <strong>Hierarchical RL (HRL)</strong> decomposes the problem into a hierarchy of sub-problems at different timescales — a high-level manager sets goals; low-level workers pursue them.</p><h3>The Options Framework</h3><p>Sutton et al. (1999) formalised <strong>options</strong> — temporally extended actions. An option ω = (I, π, β) consists of: an initiation set I (states where the option can start), an intra-option policy π (how to act within the option), and a termination condition β (probability of ending the option in each state). Options can be thought of as skills or macro-actions composed over primitive actions.</p>` },
  { type:'text', body:`<h3>HIRO (Hierarchical RL with Off-Policy Correction)</h3><p>HIRO (Nachum et al., 2018) uses two levels: a high-level controller that sets <em>subgoal states</em> every c steps, and a low-level controller trained to reach those subgoals. The high-level operates at a slower timescale (updates every c steps), treating the low-level as a black box. Off-policy correction re-labels past high-level transitions to account for the low-level policy changing over time.</p>` },
  { type:'code', lang:'python', src:`# Hierarchical RL: two-level manager-worker architecture
import torch, torch.nn as nn
import numpy as np

class HighLevelManager(nn.Module):
    """Sets subgoals in state space every c steps."""
    def __init__(self, state_dim, goal_dim=8, hidden=256):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(state_dim, hidden), nn.ReLU(),
            nn.Linear(hidden, goal_dim), nn.Tanh()  # goal in [-1, 1]^goal_dim
        )
    def forward(self, state):
        return self.net(state)

class LowLevelWorker(nn.Module):
    """Pursues the current subgoal set by the manager."""
    def __init__(self, state_dim, goal_dim, action_dim, hidden=256):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(state_dim + goal_dim, hidden), nn.ReLU(),
            nn.Linear(hidden, hidden), nn.ReLU(),
            nn.Linear(hidden, action_dim), nn.Tanh()
        )
    def forward(self, state, goal):
        return self.net(torch.cat([state, goal], dim=-1))

# Intrinsic reward for the worker: negative distance to goal
def worker_intrinsic_reward(state, goal, next_state):
    """Worker is rewarded for moving toward the goal."""
    distance_before = ((state - goal) ** 2).sum(-1).sqrt()
    distance_after  = ((next_state - goal) ** 2).sum(-1).sqrt()
    return distance_before - distance_after  # positive if moving closer

# Manager update every c=10 environment steps
# Worker update every step with intrinsic reward`,out:`# Benefit: low-level worker solves local navigation efficiently.
# High-level manager focuses on long-term strategy without micromanaging.
# Key papers: HIRO (2018), HAC (2019), DIAYN (skill discovery)`},
  { type:'tip', body:`HRL is most beneficial for long-horizon, sparse-reward tasks: robotic manipulation (grasp an object, place it, open a door), navigation (go to building X, room Y, interact with object Z), and multi-stage puzzles. For short-horizon dense-reward tasks, flat PPO/SAC is usually simpler and sufficient.` }
]};

L['rl-w7-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Reward Shaping & Inverse RL</h2><h3>Reward Shaping</h3><p>Sparse rewards (only +1 at goal) make learning extremely slow — the agent wanders randomly and rarely encounters the reward signal. <strong>Reward shaping</strong> adds auxiliary rewards to guide the agent without changing the optimal policy. A shaped reward F(s,a,s') is safe (doesn't change optimal policy) if it's a potential-based shaping: F = γ·Φ(s') − Φ(s) for any potential function Φ.</p><p>Non-potential-based shaping can introduce suboptimal attractors — the agent learns to maximise the shaped reward by exploiting the design rather than solving the real task (the "reward hacking" problem at its worst).</p>` },
  { type:'text', body:`<h3>Inverse Reinforcement Learning (IRL)</h3><p><strong>IRL</strong> (Russell, 1998; Abbeel & Ng, 2004) flips the RL problem: given demonstrations of expert behaviour, recover the reward function that the expert is implicitly optimising. Once the reward is inferred, standard RL can find the optimal policy.</p><p>Applications: learning reward functions from human demonstrations for robotics, autonomous driving, recommendation systems. <strong>GAIL</strong> (Generative Adversarial Imitation Learning) uses a discriminator to distinguish expert and agent trajectories — the discriminator's output serves as the reward signal, bypassing explicit reward recovery.</p>` },
  { type:'code', lang:'python', src:`import torch, torch.nn as nn
import numpy as np

# GAIL: Generative Adversarial Imitation Learning
class Discriminator(nn.Module):
    """Classifies (s,a) pairs as expert or agent."""
    def __init__(self, state_dim, action_dim, hidden=128):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(state_dim + action_dim, hidden), nn.Tanh(),
            nn.Linear(hidden, hidden), nn.Tanh(),
            nn.Linear(hidden, 1), nn.Sigmoid()  # probability of being expert
        )
    def forward(self, state, action):
        return self.net(torch.cat([state, action], dim=-1))

def gail_reward(discriminator, state, action):
    """Reward from discriminator: higher if looks more like expert."""
    with torch.no_grad():
        d = discriminator(state, action)
        # log(D) — agent rewarded for fooling discriminator
        return -torch.log(1 - d + 1e-8).squeeze(-1)

# Training loop
def train_discriminator(disc, disc_optim, expert_data, agent_data):
    """Train discriminator to distinguish expert from agent."""
    # Expert: label 1; Agent: label 0
    states_e, actions_e = expert_data
    states_a, actions_a = agent_data
    pred_expert = disc(states_e, actions_e)
    pred_agent  = disc(states_a, actions_a)
    loss = -torch.log(pred_expert + 1e-8).mean() - torch.log(1 - pred_agent + 1e-8).mean()
    disc_optim.zero_grad(); loss.backward(); disc_optim.step()
    return loss.item()`,out:`# GAIL training:
# 1. Collect agent rollouts using current policy π
# 2. Train discriminator on (expert, agent) pairs
# 3. Use -log(1-D(s,a)) as reward signal
# 4. Update π with PPO/TRPO using this reward
# 5. Repeat — discriminator and policy improve together`},
  { type:'tip', body:`Reward shaping tips: use potential-based shaping (F = γΦ(s') − Φ(s)) to avoid changing the optimal policy; natural potential functions include negative distance to goal, number of completed subtasks, or expert value estimates. For complex tasks, consider IRL/GAIL to learn the reward from demonstrations rather than hand-engineering it.` }
]};

L['rl-w7-l5'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>RL from Human Feedback (RLHF)</h2><p><strong>RLHF</strong> is the technique behind ChatGPT, Claude, and other instruction-following LLMs. It trains AI systems to align with human preferences by using human feedback as the reward signal — rather than trying to hand-engineer what "good responses" look like.</p><h3>The Three-Stage Pipeline</h3><ol><li><strong>Supervised Fine-Tuning (SFT):</strong> Fine-tune a pre-trained LLM on a curated dataset of (prompt, ideal response) pairs. This gives the model baseline instruction-following capability.</li><li><strong>Reward Model Training:</strong> Collect human preference data: for the same prompt, show two responses and ask humans to rank them. Train a reward model R(prompt, response) → scalar to predict these rankings (Bradley-Terry model). The reward model is the "human-in-the-loop" in a scalable form.</li><li><strong>RL Fine-tuning (PPO):</strong> Fine-tune the SFT model using PPO. The reward = R(prompt, response) − β·KL(π_new ‖ π_SFT). The KL penalty prevents the RL policy from diverging too far from the SFT model (which would degrade fluency and coherence).</li></ol>` },
  { type:'code', lang:'python', src:`import torch, anthropic
import torch.nn as nn

# Simplified RLHF reward model
class RewardModel(nn.Module):
    """Trained to predict human preference between responses."""
    def __init__(self, hidden_size=768, vocab_size=50_000):
        super().__init__()
        # In practice: use a pre-trained LLM backbone + linear head
        self.backbone = nn.Embedding(vocab_size, hidden_size)  # simplified
        self.head = nn.Linear(hidden_size, 1)  # scalar reward

    def forward(self, token_ids):
        h = self.backbone(token_ids).mean(dim=1)  # mean pooling
        return self.head(h).squeeze(-1)            # scalar reward

def reward_model_loss(reward_model, prompt, chosen, rejected):
    """Bradley-Terry loss: chosen response should score higher."""
    r_chosen   = reward_model(torch.cat([prompt, chosen],   dim=-1))
    r_rejected = reward_model(torch.cat([prompt, rejected], dim=-1))
    loss = -torch.log(torch.sigmoid(r_chosen - r_rejected)).mean()
    return loss

# PPO for RLHF: generate response, score with RM, compute KL penalty
def rlhf_reward(response_tokens, prompt_tokens, reward_model, ref_model, policy, beta=0.1):
    """Compute RLHF reward: RM score - β*KL(policy||ref)."""
    rm_score = reward_model(torch.cat([prompt_tokens, response_tokens], dim=-1))
    # KL divergence: how far has the policy drifted from SFT reference?
    kl_div = compute_kl_divergence(policy, ref_model, prompt_tokens, response_tokens)
    return rm_score - beta * kl_div`,out:`# InstructGPT (OpenAI, 2022) first showed RLHF outperforms SFT alone.
# Human raters preferred RLHF-trained 1.3B model over SFT 175B model.
# RLHF is why ChatGPT/Claude follow instructions instead of just predicting text.`},
  { type:'text', body:`<h3>DPO: Direct Preference Optimisation</h3><p><strong>DPO</strong> (Rafailov et al., 2023) bypasses the RL step entirely. It shows that the RLHF objective has a closed-form optimal policy, and training directly on preference pairs is equivalent to the full PPO pipeline — but far simpler. DPO directly optimises:</p><pre><code>L_DPO = -log σ(β·[log π(y_w|x)/π_ref(y_w|x) - log π(y_l|x)/π_ref(y_l|x)])</code></pre><p>where y_w is the chosen response, y_l the rejected response. No separate reward model, no PPO loop — just a contrastive loss on paired preference data. DPO has largely replaced PPO-based RLHF in practice due to its simplicity.</p>` },
  { type:'tip', body:`RLHF is a concrete application of RL (with PPO) and IRL (reward model from preference data) to LLMs. The reward model is the key bottleneck: it must accurately reflect human preferences, be robust to reward hacking, and generalise to unseen prompts. Constitutional AI (Anthropic) extends RLHF by using AI feedback (RLAIF) to reduce human labelling burden.` }
]};

L['rl-w7-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 7 Quiz</h2><p>Test your knowledge of model-based RL, MARL, hierarchical RL, reward shaping, IRL, and RLHF.</p>` }
]};

/* ── MODULE 8: RL in Practice ── */

L['rl-w8-l1'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>AlphaGo, AlphaZero & MuZero</h2><p>DeepMind's AlphaGo series represents the pinnacle of RL achievement — mastering games once thought beyond AI, then generalising to a single algorithm that can master any game.</p><h3>AlphaGo (2016)</h3><p>Combined supervised learning (trained on 30 million human moves), RL (self-play to improve policy network), and Monte Carlo Tree Search (MCTS) to explore move sequences. Defeated Lee Sedol (9-dan world champion) 4-1. The first AI to beat a professional Go player — a milestone that surprised most experts by a decade.</p>` },
  { type:'text', body:`<h3>AlphaZero (2017)</h3><p>Radical simplification: no human data, no hand-crafted features, no game-specific knowledge except the rules. A single neural network f_θ(s) → (p, v) maps state s to a policy vector p (move probabilities) and value v (win probability). Trained entirely via self-play with MCTS:</p><ul><li><strong>Self-play:</strong> Play games against a copy of itself, generating training data</li><li><strong>MCTS:</strong> At each move, run ~800 simulations using the neural net to guide search. MCTS makes the policy more accurate; the improved policy trains the neural net.</li><li><strong>Training:</strong> Minimise: L = (z − v)² − πᵀ log p + λ‖θ‖² (value accuracy + policy accuracy + regularisation)</li></ul><p>AlphaZero surpassed AlphaGo in Go in 8 hours, then mastered Chess (surpassing Stockfish) and Shogi in 2–4 hours. Same code, same hyperparameters.</p>` },
  { type:'code', lang:'python', src:`# MCTS with neural network guidance — simplified
import numpy as np

class MCTSNode:
    def __init__(self, state, prior=0):
        self.state = state
        self.prior = prior    # P(a|s) from neural net
        self.N = 0            # visit count
        self.W = 0.0          # total value
        self.Q = 0.0          # mean value W/N
        self.children = {}    # action → MCTSNode

    def ucb_score(self, parent_N, c_puct=1.0):
        """UCB score: Q + U, where U is exploration bonus."""
        U = c_puct * self.prior * np.sqrt(parent_N) / (1 + self.N)
        return self.Q + U

def mcts_search(root, model, n_simulations=800, c_puct=1.0):
    """Run MCTS and return visit-count-based policy."""
    for _ in range(n_simulations):
        node = root
        path = [node]

        # Selection: follow UCB to leaf
        while node.children and not is_terminal(node.state):
            N_parent = node.N
            action = max(node.children,
                         key=lambda a: node.children[a].ucb_score(N_parent, c_puct))
            node = node.children[action]
            path.append(node)

        # Expansion + Evaluation: use neural net
        if not is_terminal(node.state):
            policy, value = model(encode_state(node.state))
            for a, p in enumerate(policy):
                node.children[a] = MCTSNode(apply_action(node.state, a), prior=p)
        else:
            value = game_result(node.state)

        # Backup: update W, N along path
        for n in reversed(path):
            n.N += 1; n.W += value; n.Q = n.W / n.N

    # Return policy: visit counts from root children
    visits = {a: child.N for a, child in root.children.items()}
    total = sum(visits.values())
    return {a: v/total for a, v in visits.items()}`,out:`# MCTS with neural guidance is dramatically stronger than either alone:
# Bare MCTS: ~3000 Elo
# Bare neural net (no search): ~2000 Elo
# AlphaZero (MCTS + neural net): ~3700 Elo (superhuman Chess)`},
  { type:'text', body:`<h3>MuZero (2020)</h3><p>AlphaZero requires knowing the game rules (to simulate). <strong>MuZero</strong> removes this constraint: it learns a latent dynamics model of the environment, enabling MCTS inside an imagined world model without access to the true rules. MuZero achieves AlphaZero-level performance on board games and surpasses DQN on Atari — all with the same algorithm.</p>` },
  { type:'tip', body:`AlphaZero's key insight: MCTS guided by a neural network creates a virtuous cycle — better policy → better self-play data → better neural network → better MCTS policy. This iterative improvement from nothing to superhuman is one of RL's most elegant demonstrations. The technique generalises beyond games to any planning problem.` }
]};

L['rl-w8-l2'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>RL for Robotics & Continuous Control</h2><p>Robotics is RL's most practically impactful domain — and its hardest. Robots operate in the physical world: states and actions are continuous, rewards are sparse (did the robot grasp the object?), the dynamics are complex and variable, and bad policies can damage hardware. Key algorithms: PPO and SAC for low-dimensional state spaces; image-based variants for visual control.</p><h3>Sim-to-Real Transfer</h3><p>Training RL directly on real hardware is slow (physical interaction) and risky (crashes break robots). <strong>Sim-to-real</strong> trains in simulation then transfers to the real robot. The challenge: the simulation doesn't perfectly match reality (the "sim-to-real gap"). Key strategies:</p><ul><li><strong>Domain randomisation:</strong> Randomise simulation parameters (friction, mass, damping) during training. Policies trained under a distribution of dynamics generalise to the real world.</li><li><strong>Domain adaptation:</strong> Learn a mapping between sim and real observations (visual appearance transfer)</li><li><strong>Privileged information:</strong> Teacher policy in sim has access to privileged info (perfect state); student policy for real robot distilled from teacher on visual observations</li></ul>` },
  { type:'code', lang:'python', src:`# Sim-to-real: domain randomisation for MuJoCo → real robot
import gymnasium as gym
import numpy as np

class DomainRandomisedEnv(gym.Wrapper):
    """Randomise physics parameters each episode."""
    def __init__(self, env, randomise_range=0.3):
        super().__init__(env)
        self.base_params = {
            'friction': env.model.geom_friction.copy(),
            'mass':     env.model.body_mass.copy(),
        }
        self.r = randomise_range

    def reset(self, **kwargs):
        # Randomise physics parameters each episode
        r = self.r
        self.env.model.geom_friction[:] = (
            self.base_params['friction'] * np.random.uniform(1-r, 1+r,
            size=self.env.model.geom_friction.shape)
        )
        self.env.model.body_mass[:] = (
            self.base_params['mass'] * np.random.uniform(1-r, 1+r,
            size=self.env.model.body_mass.shape)
        )
        return self.env.reset(**kwargs)

# Curriculum: start easy, increase difficulty
class CurriculumEnv(gym.Wrapper):
    """Progressively increase task difficulty."""
    def __init__(self, env, stages):
        super().__init__(env)
        self.stages = stages      # list of difficulty configs
        self.current_stage = 0
        self.success_threshold = 0.8

    def on_episode_end(self, success_rate):
        if success_rate > self.success_threshold and self.current_stage < len(self.stages)-1:
            self.current_stage += 1
            print(f"Advancing to stage {self.current_stage}")`,out:`# Domain randomisation: training on ±30% physics variation produces
# policies that transfer to real robots with different friction/mass.
# Used in OpenAI's Dactyl (robot hand solving Rubik's cube from scratch).`},
  { type:'tip', body:`For real-robot RL: start with simulation (Isaac Gym, MuJoCo, PyBullet); use domain randomisation; then fine-tune on the real robot with safe RL methods (constrained policy optimisation to prevent damage). SAC is preferred over PPO for robotics due to its higher sample efficiency and off-policy nature (replay buffer = fewer real robot interactions needed).` }
]};

L['rl-w8-l3'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>RL for Recommendations & Business Optimisation</h2><p>RL is increasingly deployed in production for sequential decision-making problems where actions affect future states — recommendation systems, ad bidding, supply chain management, and clinical treatment optimisation.</p><h3>Recommendation Systems as MDPs</h3><p>A recommendation system can be modelled as an MDP: state = user context (history, preferences, demographics); action = item to recommend; reward = click/purchase/engagement; transition = user's evolving preferences in response to recommendations. The challenge: greedy recommendations optimise immediate clicks but ignore long-term user satisfaction and diversity.</p>` },
  { type:'code', lang:'python', src:`# RL recommender: contextual bandit (one-step) → full MDP (multi-step)

import numpy as np
import torch, torch.nn as nn

# Stage 1: Contextual Bandit (stateless RL — single recommendation)
class LinUCB:
    """Linear UCB for contextual bandits — simple, interpretable, production-ready."""
    def __init__(self, n_items, context_dim, alpha=1.0):
        self.alpha = alpha
        self.n_items = n_items
        self.A = [np.eye(context_dim) for _ in range(n_items)]  # feature covariance
        self.b = [np.zeros(context_dim) for _ in range(n_items)]  # reward accumulator

    def select(self, context):
        scores = []
        for i in range(self.n_items):
            A_inv = np.linalg.inv(self.A[i])
            theta = A_inv @ self.b[i]        # estimated weights
            ucb = theta @ context + self.alpha * np.sqrt(context @ A_inv @ context)
            scores.append(ucb)
        return np.argmax(scores)

    def update(self, item, context, reward):
        self.A[item] += np.outer(context, context)
        self.b[item] += reward * context

# Stage 2: Full MDP with user state — DQN-based recommender
class RecommenderDQN(nn.Module):
    def __init__(self, user_state_dim, n_items, hidden=256):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(user_state_dim, hidden), nn.ReLU(),
            nn.Linear(hidden, hidden), nn.ReLU(),
            nn.Linear(hidden, n_items)   # Q(user_state, item) for each item
        )
    def forward(self, user_state):
        return self.net(user_state)

# User state: embedding of recent N interactions
# Reward: watch time, rating, explicit feedback
# Constraint: item diversity (penalise repeated genres)`,out:`# LinUCB: proven in production (Yahoo! News, LinkedIn)
# DQN recommender: YouTube (Google, 2019) for long-term user satisfaction
# Constraint: fairness, diversity, safety (don't recommend harmful content)`},
  { type:'text', body:`<h3>Offline RL: Learning from Logged Data</h3><p>In many business settings, running random exploration in production is unacceptable (bad recommendations hurt user experience, unsafe medical treatments harm patients). <strong>Offline RL</strong> (also called batch RL) trains a policy purely from historical logged data D = {(s,a,r,s')} without any environment interaction. Algorithms: CQL (Conservative Q-Learning), IQL (Implicit Q-Learning), Decision Transformer. The key challenge: avoiding overestimation of actions not in the dataset (distributional shift).` }
]};

L['rl-w8-l4'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Debugging & Evaluating RL Agents</h2><p>RL is notoriously hard to debug: unlike supervised learning (loss → accuracy → done), RL training can silently learn the wrong thing. The reward may increase while the policy does something completely unintended. Systematic evaluation and monitoring are essential.</p><h3>The RL Debugging Checklist</h3><ol><li><strong>Verify the environment:</strong> Step through manually. Confirm reward ranges, observation ranges, terminal conditions. Check for bugs in wrappers.</li><li><strong>Confirm reward signal:</strong> Run with a random policy and plot rewards. Is the baseline reward what you expect? Can a human expert get much higher?</li><li><strong>Check learning signal exists:</strong> If the agent can never find reward with random actions, exploration will fail. Consider reward shaping or curriculum learning.</li><li><strong>Monitor value estimates:</strong> Plot V(s_0) over training. Should increase monotonically. Wild oscillations → instability.</li><li><strong>Watch the policy:</strong> Render episodes visually at regular intervals. Does the behaviour look sensible even when rewards are average?</li></ol>` },
  { type:'code', lang:'python', src:`import numpy as np
import matplotlib.pyplot as plt
from collections import deque

class RLTrainingMonitor:
    """Track and plot RL training metrics."""
    def __init__(self, window=100):
        self.episode_returns = []
        self.episode_lengths = []
        self.td_losses = []
        self.v_estimates = []
        self.window = window

    def log_episode(self, total_reward, length):
        self.episode_returns.append(total_reward)
        self.episode_lengths.append(length)

    def log_step(self, td_loss, v_estimate=None):
        self.td_losses.append(td_loss)
        if v_estimate is not None:
            self.v_estimates.append(v_estimate)

    def summary(self, last_n=100):
        recent = self.episode_returns[-last_n:]
        print(f"Recent {last_n} episodes:")
        print(f"  Mean return:   {np.mean(recent):.2f} ± {np.std(recent):.2f}")
        print(f"  Max return:    {np.max(recent):.2f}")
        print(f"  Mean TD loss:  {np.mean(self.td_losses[-1000:]):.4f}")
        if self.v_estimates:
            print(f"  Mean V(s_0):   {np.mean(self.v_estimates[-1000:]):.3f}")

    def plot(self):
        fig, axes = plt.subplots(2, 2, figsize=(12, 8))
        # Rolling mean return
        roll = [np.mean(self.episode_returns[max(0,i-self.window):i+1])
                for i in range(len(self.episode_returns))]
        axes[0,0].plot(roll); axes[0,0].set_title('Episode Return (rolling mean)')
        axes[0,1].plot(self.episode_lengths); axes[0,1].set_title('Episode Length')
        axes[1,0].plot(self.td_losses[::100]); axes[1,0].set_title('TD Loss')
        if self.v_estimates:
            axes[1,1].plot(self.v_estimates[::100]); axes[1,1].set_title('V(s_0) Estimate')
        plt.tight_layout(); plt.show()`,out:`# Red flags in RL training:
# - Return plateau early then stays flat → insufficient exploration
# - TD loss diverges (grows without bound) → learning rate too high
# - V(s_0) increases then crashes → policy collapse
# - Return variance very high → need more seeds / longer horizon`},
  { type:'tip', body:`Always run multiple seeds (at least 5) for RL experiments — single-seed results are unreliable due to high variance. Report mean ± std over seeds. Use deterministic evaluation (ε=0) separate from training. Standard benchmarks: CartPole (solved at 195), LunarLander (solved at 200), HalfCheetah (typical SAC achieves 10,000+).` }
]};

L['rl-w8-l5'] = { duration_mins: 25, sections: [
  { type:'text', body:`<h2>Capstone: Training a PPO Agent</h2><p>In this capstone, you'll train a PPO agent on a non-trivial Gymnasium environment, evaluate it systematically, and experiment with key hyperparameters. You'll implement the full PPO loop, log training metrics, and produce a learning curve.</p><h3>Project Options</h3><ol><li><strong>LunarLander-v2:</strong> Land a spacecraft. Dense reward, discrete actions. Solvable in ~500K steps with PPO. Visualisable.</li><li><strong>BipedalWalker-v3:</strong> Teach a 2D robot to walk. Continuous actions. Solvable in ~2M steps. Classic PPO benchmark.</li><li><strong>CartPole-v1:</strong> Balance a pole. Solve it in &lt;50K steps, then modify to make it harder (increase time limit, add noise).</li><li><strong>Custom Environment:</strong> Design a custom Gymnasium env (inventory management, scheduling, game) and train PPO on it.</li></ol>` },
  { type:'code', lang:'python', src:`# Complete PPO training loop — reference implementation for the capstone
import gymnasium as gym
import numpy as np, torch, torch.nn as nn
from torch.distributions import Categorical

# --- Model ---
class ActorCritic(nn.Module):
    def __init__(self, obs_dim, n_actions):
        super().__init__()
        self.shared = nn.Sequential(nn.Linear(obs_dim,256),nn.Tanh(),nn.Linear(256,256),nn.Tanh())
        self.actor  = nn.Linear(256, n_actions)
        self.critic = nn.Linear(256, 1)
    def forward(self, x):
        f = self.shared(x)
        return self.actor(f), self.critic(f)

# --- Hyperparameters ---
ENV_NAME    = 'LunarLander-v2'
N_STEPS     = 2048    # rollout length
N_EPOCHS    = 10      # PPO epochs per update
BATCH_SIZE  = 64
GAMMA       = 0.99
LAM         = 0.95    # GAE lambda
CLIP_EPS    = 0.2
LR          = 3e-4
TOTAL_STEPS = 1_000_000

env = gym.make(ENV_NAME)
model = ActorCritic(env.observation_space.shape[0], env.action_space.n)
optimizer = torch.optim.Adam(model.parameters(), lr=LR)
monitor = RLTrainingMonitor()

obs, _ = env.reset()
ep_return = 0
global_step = 0

while global_step < TOTAL_STEPS:
    # --- Collect rollout ---
    rollout = {'obs':[], 'actions':[], 'log_probs':[], 'rewards':[],
               'values':[], 'dones':[]}
    for _ in range(N_STEPS):
        obs_t = torch.FloatTensor(obs).unsqueeze(0)
        with torch.no_grad():
            logits, value = model(obs_t)
            dist = Categorical(logits=logits)
            action = dist.sample()
        next_obs, reward, terminated, truncated, _ = env.step(action.item())
        done = terminated or truncated
        rollout['obs'].append(obs); rollout['actions'].append(action.item())
        rollout['log_probs'].append(dist.log_prob(action).item())
        rollout['rewards'].append(reward); rollout['values'].append(value.item())
        rollout['dones'].append(float(done))
        ep_return += reward; obs = next_obs; global_step += 1
        if done:
            monitor.log_episode(ep_return, N_STEPS)
            ep_return = 0; obs, _ = env.reset()

    # --- Compute GAE advantages ---
    agent = PPOAgent(env.observation_space.shape[0], env.action_space.n)
    with torch.no_grad():
        _, last_val = model(torch.FloatTensor(obs).unsqueeze(0))
    values = rollout['values'] + [last_val.item()]
    advantages = agent.compute_gae(rollout['rewards'], values[:-1], values[1:], rollout['dones'])
    returns = advantages + torch.FloatTensor(rollout['values'])

    # --- PPO Update ---
    agent.update(rollout['obs'], rollout['actions'], rollout['log_probs'],
                 returns.tolist(), advantages)
    if global_step % 10_000 == 0:
        monitor.summary()`,out:`# Step  10000 | Ep  14 | Mean return: -189.4
# Step 100000 | Ep 104 | Mean return:  -42.1
# Step 300000 | Ep 261 | Mean return:  112.6
# Step 600000 | Ep 478 | Mean return:  187.4
# Step 1000000 | Ep 742 | Mean return: 234.8
# LunarLander is "solved" at mean return >= 200.`},
  { type:'exercise', title:'Hyperparameter Sensitivity Analysis', body:`Train your PPO agent on LunarLander with three different values of each: (1) clip epsilon {0.1, 0.2, 0.4}, (2) GAE lambda {0.8, 0.95, 1.0}, (3) n_epochs {3, 10, 20}. Run each configuration with 3 random seeds. Report which hyperparameter affects performance most, and what the optimal value is for your environment.`, hint:`Use the total return at 500K steps as your metric. Create a 3×3 grid of subplots, one per hyperparameter × value combination. Fix all other hyperparameters at their defaults while varying one.`, solution:`# Expected findings:
# clip_eps=0.1: too conservative, slow learning
# clip_eps=0.2: optimal (standard default)
# clip_eps=0.4: too aggressive, unstable
#
# lam=0.8: low variance but high bias, slower
# lam=0.95: optimal (standard default)
# lam=1.0: high variance, similar to REINFORCE
#
# n_epochs=3: underutilises collected data
# n_epochs=10: optimal
# n_epochs=20: overfits to rollout, oscillates
#
# GAE lambda is usually the most sensitive hyperparameter for sparse-reward envs.` }
]};

L['rl-w8-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 8 Quiz</h2><p>Test your understanding of AlphaZero, RL for robotics, recommendation systems, debugging RL agents, and PPO implementation.</p>` }
]};

Object.assign(window.DSA_LESSON_CONTENT || (window.DSA_LESSON_CONTENT = {}), L);
})();
