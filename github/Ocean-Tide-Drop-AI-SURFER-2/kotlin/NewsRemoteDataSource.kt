package com.example.news

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.shareIn
import kotlinx.coroutines.delay


class NewsRemoteDataSource(
    private val externalScope: CoroutineScope
) {
    val latestNews: Flow<List<ArticleHeadline>> = flow {
        // Emit an initial empty list until the repository asks for a refresh.
        emit(emptyList())
    }
        .distinctUntilChanged()
        .shareIn(
            externalScope,
            started = SharingStarted.WhileSubscribed(stopTimeoutMillis = 5_000),
            replay = 1
        )

    /**
     * Suspendable network fetch. Replace with your Retrofit/OkHttp call.
     */
    suspend fun fetchLatest(): List<ArticleHeadline> {
        // Simulate network delay (replace with actual network call)
        delay(300)
        // TODO: implement real network fetch; returning sample data for now
        return listOf(
            ArticleHeadline(id = "sample-1", title = "Sample headline 1"),
            ArticleHeadline(id = "sample-2", title = "Sample headline 2")
        )
    }
}
