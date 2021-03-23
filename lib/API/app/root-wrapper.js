import React from 'react'
import Layout from './src/components/Layout/index'
export const wrapPageElement = ({ element }) => (
    <Layout>{element}</Layout>
)