package com.example.news

import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.first
import kotlin.test.Test
import kotlin.test.assertNotNull

@OptIn(ExperimentalCoroutinesApi::class)
class TickHandlerTest {
    @Test
    fun `tick emits at least once`() = runTest {
        val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
        val tickHandler = TickHandler(scope, tickIntervalMs = 50)

        // first() will suspend until a value is emitted
        val firstTick = tickHandler.tickFlow.first()
        assertNotNull(firstTick)
    }
}
