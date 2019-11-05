import React from 'react'
import { TopicTable } from './topic.table';
import { Flex } from '../../../lib/components/flex';
import { CreateTopicCard } from './topic.create.card';


export const Main = (props) => {

	return (
		<Flex vertical>
			<CreateTopicCard />
			<TopicTable />
		</Flex>
	)
}