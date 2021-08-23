import React from 'react';
import ButtonNext from '../components/ButtonNext';

export default function main() {
  return (
    <main>
      <div>
        <p id="greeting">
          Hi, I&apos;m
          <span id="my-name"> Denis</span>
        </p>
      </div>
      <ButtonNext nextPage="about" />
    </main>
  );
}
