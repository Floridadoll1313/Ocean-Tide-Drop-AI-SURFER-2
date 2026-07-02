package com.example.news

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.shareIn
import kotlinx.coroutines.delay
import kotlinx.coroutines.currentCoroutineContext

class TickHandler(
    private val externalScope: CoroutineScope,
    private val tickIntervalMs: Long = 5_000L
) {
    val tickFlow: SharedFlow<Unit> = flow {
        while (currentCoroutineContext().isActive) {
            emit(Unit)
            delay(tickIntervalMs)
        }
    }
        .shareIn(externalScope, started = SharingStarted.Eagerly, replay = 0)
}
