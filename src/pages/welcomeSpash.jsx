import React from 'react';
import styled, { keyframes } from 'styled-components';

// Enhanced animation keyframes
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const float = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -60%) scale(1.1); }
`;

// New smooth wave animation using multiple waves
const waveAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

// Styled Components with enhanced visual design
const WelcomePage = styled.div`
  margin-top: 20px;
  width: 90%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 16px;
  padding: 48px 24px;
  background: linear-gradient(135deg, #0d6efd, #0dcaf0);
  color: white;
  text-align: center;
  box-shadow: 0 12px 24px rgba(13, 110, 253, 0.2);
  position: relative;
  overflow: hidden;
`;

const WelcomeHeader = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  animation: ${fadeIn} 2s ease-in-out;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Icon = styled.span`
  display: inline-block;
  font-size: 32px;
  animation: ${bounce} 1.5s infinite;
  margin: 0 8px;
  opacity: 0.9;
`;

const WelcomeContent = styled.div`
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 30px;
  animation: ${slideIn} 2s ease-in-out;
  opacity: 0.9;
  
  p {
    margin: 0;
    font-weight: 300;
    letter-spacing: 0.5px;
  }
`;

const AnimationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  margin-top: 20px;
`;

const Circle = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${float} 3s infinite ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Create multiple wave containers for smoother animation
const WaveContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 40px;
  animation: ${waveAnimation} 7s infinite linear;
  transform-origin: center bottom;
`;

const Wave = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='rgba(255, 255, 255, 0.3)'/%3E%3C/svg%3E");
  background-position: 0 bottom;
  background-repeat: repeat-x;
  background-size: 50% 40px;
  bottom: 0;
`;

const SecondWave = styled(Wave)`
  animation: ${waveAnimation} 7s infinite linear;
  animation-delay: -3.5s;
  opacity: 0.5;
`;

// Main Component with enhanced structure
const WelcomeSplash = () => {
  return (
    <WelcomePage>
      <WelcomeHeader>
        <Icon>⚡</Icon>
        Welcome to Inventron
        <Icon>⚡</Icon>
      </WelcomeHeader>
      <WelcomeContent>
        <p>Your ultimate inventory management solution!</p>
      </WelcomeContent>
      <AnimationContainer>
        <Circle />
        <WaveContainer>
          <Wave />
          <SecondWave />
        </WaveContainer>
      </AnimationContainer>
    </WelcomePage>
  );
};

export default WelcomeSplash;